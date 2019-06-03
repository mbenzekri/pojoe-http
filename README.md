
# pojoe-http: http Pojoe steps
>this module provides Pojoe steps for http/https calls (uses got)
# install

>`npm install mbenzekri/pojoe-http`

# included steps 
>- [HttpDownload](#httpdownload-get-data-to-from-url-and-write-it-to-file) : get data to from url and write it to file
# HttpDownload get data to from url and write it to file
>

## goal

>this step get data from urls and writes corresponding data to files
>- allow writing data for each pojo url inputed 
>- allow full directory path creation if missing 
>- allow update only if file is out of date 
>- allow see got options ... 

---
## parameters
> **url** *{url}* -- the url to download  -- default = `https://github.com/mbenzekri/pojoe-http/raw/master/README.md`
> 
> **filename** *{path}* -- the target filename for the downloaded resource  -- default = `d:/tmp/README.md`
> 
> **createdir** *{boolean}* -- if true create the missing directories for created file  -- default = `false`
> 
> **overwite** *{boolean}* -- if true overwrite existing file  -- default = `false`
> 
## inputs
>- **urls** -- pojos from which urls to download will be extracted 

## outputs
>- **downloaded** -- downloaded files 
>> provided properties: 
>>- **url** *{url}* -- url of the downloaded resource
>>- **filename** *{path}* -- target file name
>- **failed** -- failed to download files 
>> provided properties: 
>>- **url** *{url}* -- url of the downloaded resource
>>- **filename** *{path}* -- target file name
>>- **reason** *{string}* -- reason for failure


---

---
