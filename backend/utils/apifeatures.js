class ApiFeatures {
    constructor(query,querystr){
       this.query = query;
       this.querystr = querystr 
    }

    search(){
        const keyword = this.querystr.keyword ?{
            name:{
                $regex:this.querystr.keyword,
                $options:"i",
            },
        }:{}
        //  console.log(keyword);


        this.query = this.query.find({...keyword});
        return this
    }
    filter(){
        const queryCopy = {...this.querystr}

        //Removing some fields for category
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach(key=>delete queryCopy[key]);

        //Filter For Price and Rating

        // console.log(queryCopy);

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key =>`$${key}`);
         
        this.query = this.query.find(JSON.parse(queryStr));

        // console.log(queryStr);
        return this;
    }

    pagination(resultPerpage){
   const currentPage = Number(this.querystr.page)||1;

    const skip = resultPerpage*(currentPage-1)

    this.query = this.query.limit(resultPerpage).skip(skip);
    return this;
    }
};

module.exports = ApiFeatures;