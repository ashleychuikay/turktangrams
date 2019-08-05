
library(jsonlite)
library(dplyr)
library(ggplot2)
library(tidyr)
library(lubridate)

setwd(dirname(rstudioapi::getActiveDocumentContext()$path))

## old stimuli
#filenames1 <- list.files("turkstudy1/production-results/", 
#                        pattern="*.json", full.names = TRUE)
#filenames2 <- list.files("turkstudy2/production-results/", 
#                         pattern="*.json", full.names = TRUE)
#filenames3 <- list.files("turkstudy3/production-results/", 
#                         pattern="*.json", full.names = TRUE)

filenames1 <- list.files("similar1/production-results/", 
                         pattern="*.json", full.names = TRUE)
filenames2 <- list.files("similar2/production-results/", 
                         pattern="*.json", full.names = TRUE)
filenames3 <- list.files("similar3/production-results/", 
                         pattern="*.json", full.names = TRUE)
filenames4 <- list.files("similar4/production-results/", 
                         pattern="*.json", full.names = TRUE)
filenames5 <- list.files("similar5/production-results/", 
                         pattern="*.json", full.names = TRUE)
filenames6 <- list.files("similar6/production-results/", 
                         pattern="*.json", full.names = TRUE)
filenames7 <- list.files("similar7/production-results/", 
                         pattern="*.json", full.names = TRUE)
filenames8 <- list.files("similar8/production-results/", 
                         pattern="*.json", full.names = TRUE)
filenames9 <- list.files("similar9/production-results/", 
                         pattern="*.json", full.names = TRUE)
filenames10 <- list.files("similar10/production-results/", 
                         pattern="*.json", full.names = TRUE)
filenames11 <- list.files("similar11/production-results/", 
                         pattern="*.json", full.names = TRUE)
filenames12 <- list.files("similar12/production-results/", 
                         pattern="*.json", full.names = TRUE)
filenames13 <- list.files("similar13/production-results/", 
                          pattern="*.json", full.names = TRUE)



## old stimuli
#files <- append(filenames1, filenames2)
#filenames <- append(files, filenames3)

filenames <- rbind(filenames1, filenames2, filenames3, filenames4, filenames5, filenames6, filenames7, filenames8, filenames9, filenames10, filenames11, filenames12, filenames13)

ldf <- lapply(filenames, fromJSON)
res <- lapply(ldf, summary)

tangramdf <- data.frame()
sender_timing <- data.frame()

for(i in 1:length(ldf)){
  tmp_trials <- ldf[[i]]$answers$data$trial_info
  tmp_RTs <- ldf[[i]]$answers$data$slider_answers
  tmp<-data.frame(tmp_trials)
  read.csv(textConnection(tmp_RTs))
  
  data <- cbind(i, tmp, read.csv(textConnection(tmp_RTs))) %>%
    select(-stimulus) %>%
    mutate(X1=as.character(X1), X2= as.character(X2))
  
  data <- data %>% 
    rowwise() %>%  
    mutate(group1 = min(X1,X2), group2 = max(X1,X2)) %>%
    mutate(pair = paste(group1, group2))%>%
    select(-X1, -X2)
  
  tangramdf <- bind_rows(tangramdf, data)
  
  sender_timing <- rbind(sender_timing, as.data.frame(
    cbind(i, start= ldf[[i]]$AcceptTime,stop = ldf[[i]]$SubmitTime)))
}

howLong <- sender_timing %>% 
  mutate(howLong = as.numeric(as.duration(ymd_hms(sender_timing$start) %--% ymd_hms(sender_timing$stop)))) %>%
  select(i, howLong) %>%
  filter(howLong < 1200)

sort(howLong$howLong)
median(howLong$howLong)/60
hist(howLong$howLong/60)

write.csv(tangramdf, 'similartangramsdata.csv', row.names = F)                 
