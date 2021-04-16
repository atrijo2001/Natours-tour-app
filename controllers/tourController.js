const Tour = require('../Models/Tour')
const APIFeatures = require('../utils/apiFeatures')

exports.aliasTopTours = async(req, res, next)=>{
   req.query.limit = '5';
   req.query.sort =  '-ratingsAverage,price';
   req.query.fields = 'name,price,ratingsAverage,summary,difficulty'

  next();
}



exports.getAllTours = async(req, res) => {

  try {

    //Execute query
    const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().pagination();
    const tours = await features.query
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

exports.getTourStats = async(req, res) =>{
  try {
    const stats = await Tour.aggregate([
      {
        $match: {ratingsAverage: {$gte: 4.5}}
      },
      {
        $group: {
          _id: '$difficulty',
          numTours: {$sum: 1},
          numRatings: {$sum: '$ratingsQuantity'},
          avgRating: {$avg: '$ratingsAverage'},
          avgPrice: {$avg: '$price'},
          minPrice: {$min: '$price'},
          maxPrice: {$max: '$price'}
        }
      },
      {
        $sort: {avgPrice: -1}
      }
    ])

    res.status(200).json({
      message: "success",
      result: stats
    })
  } catch (error) {
    res.status(404).json({
      message: "couldnt delete",
      error
    })
  }
}

exports.getMonthlyPlan = async(req, res) => {
  try {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group : {
          _id: {$month : '$startDates'},
          numTourStarts: {$sum: 1},
          tours: {$push: '$name'}
        }
      },
      {
        $addFields: {
          month: '$_id'
        }
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: {numTourStarts: 1}
      }
    ]);

    res.status(200).json({
      message: "success",
      result: plan
    })
  } catch (error) {
    console.log(error.message)
    res.status(404).json({
      message: "couldnt delete",
      error
    })
  }
}