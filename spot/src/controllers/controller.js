import Spot from '../models/model.js';


export async function findSpot(req, res) {
  const sport = req.body.sport || null;
    const value = req.body.value || null;
    const date  = req.body.date  || null;
    console.log(sport);
    console.log(value);
    console.log(date);
  try {

    const spots = await Spot.find(sport, value, date);
    res.status(201).json(spots);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Error finding spots' });
  }
}

