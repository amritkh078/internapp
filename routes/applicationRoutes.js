const express = require('express');
const client = require('../config/dbConfig.js');

const router = express.Router();

// Receive an internship application
router.post('/', (req, res) => {
  const { opportunityId, applicantName, email, coverLetter } = req.body;

  client.none(
    'INSERT INTO internship_applications (id, applicant_name, email, cover_letter) VALUES ($1, $2, $3, $4)',
    [opportunityId, applicantName, email, coverLetter]
  )
    .then(() => {
      res.status(201).json({ message: 'Internship application received successfully' });
    })
    .catch((error) => {
      console.error('Error receiving internship application:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Retrieve all internship applications
router.get('/', (req, res) => {
  client.any('SELECT * FROM internship_applications')
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error retrieving internship applications:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Filter internship applications by opportunity ID
router.get('/filter', (req, res) => {
  const opportunityId = req.query.opportunityId;

  client.any('SELECT * FROM internship_applications WHERE opportunity_id = $1', opportunityId)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error filtering internship applications:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;
