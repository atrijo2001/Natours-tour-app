const Tour = require('../Models/Tour')

exports.getAllTours = async(req, res) => {
  
  try {

  const tours = await Tour.find();
    res.status(200).json(tours);
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
      const {name, rating, price} = req.body;
      const tour = await Tour.create({name, rating, price})
      res.status(200).json({
        message: "Success",
        data: tour
      })       
     } catch (error) {
       res.status(400).json({
         status: 'fail',
         message: error
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