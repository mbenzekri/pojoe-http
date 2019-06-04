
# pojoe-http: http Pojoe steps
>this module provides Pojoe steps for http/https calls (uses got)
# install

>`npm install mbenzekri/pojoe-http`

# included steps 
>- [HttpDownload](#httpdownload-get-data-to-from-url-and-write-it-to-file) : get data to from url and write it to file
# HttpDownload get data to from url and write it to file
>

## goal

>this step get data from urls and writes corresponding resources to files
>- allow download urls resources for each inputed pojo url 
>- allow full directory path creation if missing 
>- allow update only if file is out of date 
>- allow do not overwrite existing files 
>- output success and failure urls downloadeds/files writtens 
>- output when success indicates update or not 

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
> **update** *{boolean}* -- if true update only if file modification date is older than url resource   -- default = `true`
> 
## inputs
>- **urls** -- pojos from which urls to download will be extracted 

## outputs
>- **downloaded** -- downloaded files 
>> provided properties: 
>>- **url** *{string}* -- url of the downloaded resource
>>- **filename** *{string}* -- target file name
>>- **updated** *{boolean}* -- true if resource has been updated
>- **failed** -- failed to download files 
>> provided properties: 
>>- **url** *{string}* -- url of the downloaded resource
>>- **filename** *{string}* -- target file name
>>- **reason** *{string}* -- reason for failure


---

---
