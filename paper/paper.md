---
title: 'COINSTAC: Collaborative Informatics and Neuroimaging Suite Toolkit for Anonymous Computation'
tags:
  - Neuroimaging
  - Decentralized Analysis
  - JavaScript
  - Python
authors:
  - name: Harshvardhan Gazula
    affiliation: 1 # (Multiple affiliations must be quoted)
  - name: Ross Kelly
    affiliation: 1
  - name: Vince D. Calhoun
    affiliation: 1
affiliations:
 - name: Center for Translational Research in Neuroimaging and Data Science,
 Georgia State University, Georgia Institute of Technology, Emory University, Atlanta, GA, USA
   index: 1
 - name: Institution 2
   index: 2
date: 27 October 2019
bibliography: paper.bib

# Optional fields if submitting to a AAS journal too, see this blog post:
# https://blog.joss.theoj.org/2018/12/a-new-collaboration-with-aas-publishing
#aas-doi: 10.3847/xxxxx <- update this with the DOI from AAS once you know it.
#aas-journal: Astrophysical Journal <- The name of the AAS journal.
---

# Statement of need

Central to the field of neuroimaging is the development of techniques for making 
sense of complex brain data. However, rapid technological advancements are pushing 
the spatial and temporal resolution of imaging in different modalities to a never 
before seen level leading to large datasets which cannot be worked out in a traditional 
desktop computing paradigm. This has led to a paradigm shift in scientific research 
increasing the emphasis on collaborative data-sharing. However, current approaches to 
data-sharing such as negotiating multiple data sharing agreements, can be cumbersome. 
In addition, there are also significant data transfer, organization and computational 
challenges. The bottomline being collaborative group research requires a great deal of 
coordination. Human and business factors can hamper research from happening at a pace 
that we are able to handle! Constraints may even forbid group research to occur at all.

# Software
``COINSTAC`` [@plis2016coinstac] is a web-based framework titled Collaborative Informatics and Neuroimaging 
Suite Toolkit for Anonymous Computation that addresses the aforementioned issues. It provides a platform
to analyze data stored locally across multiple organizations without the need for pooling the data at any point 
during the analysis. It is intended to be an ultimate one-stop shop by which researchers can build 
any statistical [@ming2017coinstac] or machine learning model [@gazula2018decentralized] collaboratively in a decentralized fashion. This framework 
implements a message passing infrastructure that will allow large scale analysis of decentralized data 
with results on par with those that would have been obtained if the data were in one place. Since, 
there is no pooling of data it also preserves the privacy of individual datasets.

# Features
``COINSTAC`` removes the barriers to collaborative analysis by:
1. decentralizing analyses and computation
* Each user performs analyses/pipelines/etc all on their own computers. bits and pieces of each users' output may be sent to a central compute node
* A central compute node performs a complimentary component of the group analysis, generally a Machine Learning algorithm. this node may trigger adjusted computations on users' machines, generally in effort to improve a model, which the research is trying to predict!
2. not synchronizing full datasets. instead, synchronizing only resultant analysis metrics
* As previously discussed, central compute nodes aggregate these metrics, and attempt to draw conclusions from the contributor swarm
* Because machine learning algorithms can be designed to model outcomes via artifacts of your analysis Pipelines, we keep your data safely and conveniently on your own machine, untouched.
3. applying differential privacy strategies to truly anonymize private data, whilst still permitting collaboration.

# Summary
In conclusion, ``COINSTAC`` strongly encourages the use of decentralized algorithms in large neuroimaging studies over systems that are optimized for large-scale centralized data processing.

# Acknowledgements

This work was funded by the National Institutes of Health (grant numbers: P20GM103472/5P20RR021938, 
R01EB005846, 1R01DA040487) and the National Science Foundation (grant numbers: 1539067 and 1631819).
In addition, the authors would like to acknowledge the efforts of many unnamed personnel over the years
who contributed to the development of ``COINSTAC``.

# References