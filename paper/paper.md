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
  - name: Javier Romero
    affiliation: 1
  - name: Eric Verner
    affiliation: 1
  - name: Bradley T. Baker
    affiliation: 1
  - name: Rogers F. Silva
    affiliation: 1
  - name: Hafiz Imtiaz
    affiliation: 2
  - name: Debbrata Kumar Saha
    affiliation: 1
  - name: Rajikha Raja
    affiliation: 1
  - name: Jessica A. Turner
    affiliation: 1
  - name: Anand D. Sarwate
    affiliation: 2
  - name: Sergey M. Plis
    affiliation: 1
  - name: Vince D. Calhoun
    affiliation: 1
affiliations:
 - name: Center for Translational Research in Neuroimaging and Data Science, Georgia State University, Georgia Institute of Technology, Emory University, Atlanta, GA, USA
   index: 1
 - name: Department of Electrical and Computer Engineering, Rutgers, The State University of New Jersey, Piscataway, NJ, USA
   index: 2
date: 27 October 2019
bibliography: paper.bib

# Optional fields if submitting to a AAS journal too, see this blog post:
# https://blog.joss.theoj.org/2018/12/a-new-collaboration-with-aas-publishing
#aas-doi: 10.3847/xxxxx <- update this with the DOI from AAS once you know it.
#aas-journal: Astrophysical Journal <- The name of the AAS journal.
---

# Summary

Central to the field of neuroimaging is the development of techniques for making 
sense of complex brain data. However, rapid technological advancements are pushing 
the spatial and temporal resolution of imaging in different modalities to an unprecedented
level, leading to large datasets which cannot be analyzed in the traditional 
desktop computing paradigm. This has led to a paradigm shift in scientific research with an 
increasing emphasis on collaborative data sharing. However, current approaches to 
data sharing, such as negotiating multiple data sharing agreements, can be cumbersome. 
In addition, there are also significant data transfer, organizational, and computational 
challenges, the result being that collaborative group research requires a great deal of 
coordination. Human and business factors can hamper research from happening at a constructive 
pace, maybe even forbidding group research to occur at all.

# Statement of Need
The Collaborative Informatics and Neuroimaging Suite Toolkit for Anonymous Computation (``COINSTAC`` [@plis2016coinstac]) is a web-based framework that addresses the aforementioned issues. It provides a platform
to analyze data stored locally across multiple organizations without the need for pooling the data at any point 
during the analysis, enabling decentralization.

# Software
COINSTAC is intended to be the ultimate hub by which researchers can build  statistical [@ming2017coinstac] or machine learning models [@gazula2018decentralized] collaboratively in a decentralized fashion. This framework  implements a message-passing infrastructure that allows large-scale analysis of decentralized data  with results on par with those that would have been obtained if the data were centralized. Because there is no pooling of data, COINSTAC protects the privacy of individual datasets. In addition, COINSTAC also offers differentially private algorithms for enhanced protection from reidentification attacks. Differential privacy is a framework to control the risk that individual data points can be inferred from the output of the algorithm [@dwork2014algorithmic]. Computations can be local or decentralized and are deployed using a containerized model. COINSTAC simulator, a simulation environment for algorithm developers to build COINSTAC computations, is also available. After developers ensure compatibility of their computations with COINSTAC through the simulator, these computations can then be made available within the COINSTAC platform.

![A graphical representation of decentralization in COINSTAC](coinstac-first-example.png)

# Related Work
In the past, data-specific collaborative efforts have included either aggregating the data via a centralized data sharing repository or sharing data via agreement-based collaborations. Frameworks such as ENIGMA [@thompson2014enigma] to some extent bypass the need for data agreements by performing a centrally coordinated analysis at each local site. Another framework called ViPAR [@carter2016vipar] tries to go one step further by completely isolating the data at the local site but only pooling it via transfer to perform automated statistical analyses. However, the heterogeneity among the local analyses caused by adopting various data collection mechanisms or preprocessing methods can lead to inaccurate meta-analysis findings. Other tools such as CBRAIN [@sherif2014cbrain], Loris [@das2012loris], XNAT [@herrick2016xnat], and OpenNeuro [@gorgolewski2017openneuro] exist, but a more detailed comparison is not provided herein, as COINSTAC is, to our knowledge, the first application platform enabling decentralized analysis of brain imaging data. 

# Features
``COINSTAC`` removes the barriers to collaborative analysis by:

1. Decentralizing analyses and computation.

* Analysis pipelines only interact with site data on their own computers. Aggregate derived data, such as model weights, from each user may be sent to a central compute node, but never raw data. Over a dozen local and decentralized computations/algorithms have been developed already, with more coming.

* A central compute node performs a complimentary component of the group analysis by coordinating between the various data nodes participating in a consortium. This node may trigger adjusted computations on user machines to improve a model.

2. Not synchronizing full datasets. Instead, synchronizing only aggregate-level analysis metrics (e.g., the gradients of a machine learning algorithm)

* As previously discussed, central compute nodes aggregate these metrics and help the user draw conclusions from the contributors.

* Because machine learning algorithms can be designed to model outcomes via artifacts of analysis pipelines, COINSTAC keeps data safely and conveniently on site computers.

3. Applying differential privacy strategies to further enhance anonymization of private data while still permitting collaboration.

* To protect against malicious embedded attacks inside computations, all computations made available in COINSTAC are manually vetted.

# Example Usage

In a recent study [@Gazula846386], the Global Imaging Genetics of Adolescents consortium performed a decentralized voxel-based morphometry analysis of structural magnetic resonance imaging data across two sites to examine the structural changes in the brain related to age, body mass index, and smoking. The code used for the analysis [@coinstacvbm] and sample data [@coinstacvbmsampledata] are publicly available on GitHub.

# Community Guidelines

We encourage collaboration from the community, including creating a computation to run in COINSTAC, conducting a study using COINSTAC, or contributing to our open-source code base.

# Acknowledgements

This work was funded by the National Institutes of Health (grant numbers: R01EB005846, 1R01DA040487,
P20GM103472/5P20RR021938) and the National Science Foundation (grant numbers: 1539067 and 1631819).
In addition, the authors would like to acknowledge the contributions of Jing Ming, Sandeep R. Panta, Eswar Damaraju, Anees Abrol, Torran Kahleck, Dylan Wood, Chris Dieringer, Drew Landis, Cory Reed, and many other unnamed personnel over the years
who contributed to the development of ``COINSTAC``.

# References
