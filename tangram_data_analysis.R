## Turk Tangram Analysis
library(tidyverse)
library(ggplot2)

tangramdata <- read.csv("turktangramsdata.csv")

tangramdata %>%
  group_by(pair)
  
