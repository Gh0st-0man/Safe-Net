## please ensure you are using python 3.11.9 

## After creating and activating the env enter this command to download torch 
```
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu 
``` 

## Finally ensure you downloaded the model files from 


https://drive.google.com/file/d/1G0ZuSwpfgFV1ZAjf89DtNT6TTvcobN2c/view?usp=sharing


OR if you just want to download the docker container then use 
```
docker pull azanmoha/fastapi-safenet:latest
```
Run it with 

```
docker run -d -p 5000:5000 --env-file ./app/.env --name url-scanner-api azanmoha/fastapi-safenet:latest
```
