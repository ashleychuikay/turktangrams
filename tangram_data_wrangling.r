
library(jsonlite)
library(dplyr)
library(ggplot2)
library(tidyr)
library(lubridate)

setwd(dirname(rstudioapi::getActiveDocumentContext()$path))

filenames1 <- list.files("turkstudy1/production-results/", 
                        pattern="*.json", full.names = TRUE)
filenames2 <- list.files("turkstudy2/production-results/", 
                         pattern="*.json", full.names = TRUE)
filenames3 <- list.files("turkstudy3/production-results/", 
                         pattern="*.json", full.names = TRUE)
files <- append(filenames1, filenames2)
filenames <- append(files, filenames3)

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

write.csv(tangramdf, 'turktangramsdata.csv', row.names = F)                 
