class APIFeatures{
    constructor(query, queryString){
      this.query = query;
      this.queryString = queryString;
    }
  
    filter(){
      const queryObj = {...this.queryString} //Creating a new object, a shallow copy which is not the reference
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
  
      //Deleting the excluded fields present in the query object like page, sort, limit or fields
      excludedFields.forEach(el => delete queryObj[el]);
  
      //Advanced filterring
      let queryString = JSON.stringify(queryObj);
      queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    
    
      this.query = this.query.find(JSON.parse(queryString))
      // This method returns a qquery. We do it this way so that later on we can keep chaining more methods to it.
      // let query = Tour.find(JSON.parse(queryStr))
      return this;
    }
  
    sort(){
      if(this.queryString.sort){
        const sortBy = this.queryString.sort.split(',').join(' ')
        this.query = this.query.sort(sortBy)
      } else{
        this.query = this.query.sort('-createdAt');
      }
  
      return this;
    }
  
    limitFields(){
      if(this.queryString.fields){
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields)
      } else{
        this.query = this.query.select('-__v')
      }
      return this;
    }
  
    pagination(){
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page -1)*limit;
  
      //page=2&limit=10 1-10 in page 1, 11 to 20 in page 2, 21 to 30 in pagge 3 and so on
      this.query = this.query.skip(skip).limit(limit)
  
      // if(this.queryString.page){
      //   const newTours = await Tour.countDocuments();
      //   if(skip>=newTours){
      //     throw new Error('This page does not exist.')
      //   }
      // }
      return this;
  
    }
  }


  module.exports = APIFeatures;