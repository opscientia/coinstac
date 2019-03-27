'use strict';

const fs = require('fs');
const pify = require('util').promisify;
const Emitter = require('events');
const Controller = require('./controller');
const join = require('path').join;

const hardLink = pify(fs.link);

module.exports = {
  create(
    { steps },
    runId,
    {
      mode,
      operatingDirectory,
      clientId,
      userDirectories,
    }
  ) {
    const cache = {};
    let currentStep;
    let currentState;

    const stateEmitter = new Emitter();


    const pipelineSteps = steps.map(
      step => Controller.create(step, runId, { mode, operatingDirectory, clientId })
    );

    const prepCache = (pipelineSpec) => {
      pipelineSpec.forEach((step) => {
        for (let [key, val] of Object.entries(step.inputMap)) { // eslint-disable-line no-restricted-syntax, no-unused-vars, max-len, prefer-const
          if (val.fromCache) {
            // the currentComputation index may be dynamic if
            // mult comps per step is added as a feature
            const compSpec = pipelineSteps[val.fromCache.step]
              .controllerState.currentComputations[0].computation;
            cache[val.fromCache.step] = Object.assign(
              { preProcess: !!compSpec.meta.preProcess },
              cache[val.fromCache.step],
              {
                [val.fromCache.variable]:
                  Object.assign({}, compSpec.output[val.fromCache.variable]),
              }
            );
          }
        }
      });
    };


    // remote doesn't get any step input, happens all client side
    if (mode !== 'remote') {
      prepCache(steps);
    }
    return {
      cache,
      currentState,
      currentStep,
      id: runId,
      mode,
      stateEmitter,
      pipelineSteps,
      run(remoteHandler) {
        const packageState = () => {
          const ctrs = this.pipelineSteps[this.currentStep].controllerState;
          this.currentState = {
            currentIteration: ctrs.iteration,
            controllerState: ctrs.state,
            pipelineStep: this.currentStep,
            mode: this.mode,
            totalSteps: this.pipelineSteps.length,
          };

          return this.currentState;
        };

        const setStateProp = (prop, val) => {
          this[prop] = val;
          stateEmitter.emit('update', packageState());
        };
        pipelineSteps.forEach(
          (step) => {
            step.stateEmitter.on('update', () => stateEmitter.emit('update', packageState()));
          }
        );
        // TODO: simlink here
        const loadCache = (output, step) => {
          const proms = [];
          if (cache[step]) {
            for (let [key] of Object.entries(cache[step])) { // eslint-disable-line no-restricted-syntax, max-len, prefer-const
              if (cache[step][key].type === 'covariates' && cache[step][key].preProcess) {
                output[key].data.forEach((file) => {
                  proms.push(hardLink(file, join(userDirectories.baseDirectory, file)));
                });
              } else {
                cache[step][key].value = output[key];
              }
            }
          }
          return Promise.all(proms);
        };
        // TODO: FP here
        const loadInput = (step) => {
          const output = {};
          for (let [key, val] of Object.entries(step.inputMap)) { // eslint-disable-line no-restricted-syntax, max-len, prefer-const
            if (val.fromCache) {
              output[key] = cache[val.fromCache.step][val.fromCache.variable].value;
            } else {
              output[key] = val.value;
            }
          }
          return output;
        };
        return pipelineSteps.reduce((prom, step, index) => {
          setStateProp('currentStep', index);
          // remote doesn't execute local steps but shares the same spec
          if (this.mode === 'remote' && step.controller.type === 'local') {
            return Promise.resolve();
          }
          return prom.then(() => step.start(this.mode === 'remote' ? {} : loadInput(step), remoteHandler))
            .then((output) => {
              loadCache(output, index);
              return output;
            });
        }, Promise.resolve());
      },
    };
  },
};
