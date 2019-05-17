
# pes-http: http steps
>https://github.com/mbenzekri/pes-http
# install

>`npm install mbenzekri/cef-fs`

# included steps 
>- [HttpGet](#httpget-get-data-to-from-url-and-write-it-to-file) : get data to from url and write it to file
---
# HttpGet get data to from url and write it to file
>

## goal

>this step get data from urls and writes corresponding data to files
>- allow writing data for each pojo url inputed 
>- allow full directory path creation if missing 
>- allow update only if file is out of date 
>- allow see got options ... 

---
## parameters
> **url** *{string}* -- the url to download  -- default = `https://www.google.com`
> 

> **createdir** *{boolean}* -- if true create the missing directories for created file  -- default = `true`
> 

> **update** *{string}* -- if true download only if file is out of date  -- default = `null`
> 

## inputs
>- **urls** -- pojos with the infos to construct the url 

## outputs
>- **files** -- downloaded files 
>> provided properties: 
>>- **filename** *{string}* -- downloaded file name
>>- **updated** *{boolean}* -- if true downloaded file updated (was out of date)


---

