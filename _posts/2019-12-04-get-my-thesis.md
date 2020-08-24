---
layout: post
title:  "A new localization algorithm for structured wireless sensor networks"
date:   2019-12-04 11:56:02 +0100
permalink: /post/:title/
categories: [academic,thesis,publication]
---

This year, I have completed my undergard studies. The research thesis I created is called [**Batch localization algorithm for floating wireless sensor networks**](http://www.user.tu-berlin.de/mhaug/batch-mobile-wsn-localization.pdf).

In it, I developed a new algorithm to assign a position to each transmission of mobile nodes of a WSN from a centralized backend. The WSN is required to have static nodes with known positions.
Furthermore, the environment in which the WSN has been deployed has to be structured like a tree graph. Given this infrastructure, the algorithm is able to interpolate the sensor's positions between the reference nodes
based on their speed, the topology of the deployment area, and, optionally, encounters with other sensors.

This approach is well-suited to be used in streaming pipelines (e.g. with Apache Flink). You can read more about the approach yourself by clicking the title above.
If you are more inclined to read code than academic papers, you can check out the reference implementation of [GRAL on GitHub](https://github.com/reknih/GRAL) (that's the name of the algorithm).
