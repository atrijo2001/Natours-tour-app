const Tour = require('../Models/Tour')

exports.getAllTours = async(req, res) => {
  const queryObj = {...req.query} //Creating a new object, a shallow copy which is not the reference
  const excludedFields = ['page', 'sort', 'limit', 'fields'];

  //Deleting the excluded fields present in the query object like page, sort, limit or fields
  excludedFields.forEach(el => delete queryObj[el])
  
  console.log(queryObj)
  try {

  const tours = await Tour.find(queryObj);
    res.status(200).json({
      message: "success",
      results: tours.length,
      data: tours
    });
  } catch (error) {
    res.status(404).json({
      message: "Couldnt get any tours",
      error
    })
  }
};

exports.getTour = async(req, res) => {
  const id = req.params.id;

  try {
     const tour = await Tour.findById(id);
     res.status(200).json(tour)
  } catch (error) {
    res.status(404).json({
      message: "Couldnt get tour",
      error: error
    })
  }
};

exports.createTour = async(req, res) => {

     try {
      const tour = await Tour.create(req.body)
      res.status(200).json({
        message: "Success",
        data: tour
      })       
     } catch (error) {
       res.status(400).json({
         status: 'fail',
         message: error.message
       })
     }
};

exports.updateTour = async(req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    res.status(200).json(tour)
  } catch (error) {
    console.log(error)
    res.status(404).json({
      message: 'Couldnt update tour',
      error: error
    })
  }
};

exports.deleteTour = async(req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    res.status(400).json({
      message: "Successfully deleted tour",
      data: deletedTour
    })
  } catch (error) {
    res.status(404).json({
      message: "couldnt delete",
      error
    })
  }
};