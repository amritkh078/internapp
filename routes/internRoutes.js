const express = require('express');
const client = require('../config/dbConfig.js');

const router = express.Router();

// Post an internship opportunity
router.post('/', (req, res) => {
  const { department, position_title, qualifications, deadline, additionalInfo } = req.body;

  client.none(
    'INSERT INTO internships (department, position_title, qualifications, deadline, additional_info) VALUES ($1, $2, $3, $4, $5)',
    [department, position_title, qualifications, deadline, additionalInfo]
  )
    .then(() => {
      res.status(201).json({ message: 'Internship opportunity created successfully' });
    })
    .catch((error) => {
      console.error('Error creating internship opportunity:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Retrieve all internship opportunities
router.get('/', (req, res) => {
  client.any('SELECT * FROM internships')
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error retrieving internship opportunities:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Retrieve an internship opportunity by ID
router.get('/:id', (req, res) => {
  const internshipId = req.params.id;

  client.one('SELECT * FROM internships WHERE id = $1', internshipId)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error retrieving internship opportunity:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Update an internship opportunity by ID
router.put('/:id', (req, res) => {
  const internshipId = req.params.id;
  const { department, position_title, qualifications, deadline, additionalInfo } = req.body;

  client.none(
    'UPDATE internships SET department = $1, position_title = $2, qualifications = $3, deadline = $4, additional_info = $5 WHERE id = $6',
    [department, position_title, qualifications, deadline  , additionalInfo, internshipId]
    )
      .then(() => {
        res.json({ message: 'Internship opportunity updated successfully' });
      })
      .catch((error) => {
        console.error('Error updating internship opportunity:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });
  
  // Delete an internship opportunity by ID
  router.delete('/:id', (req, res) => {
    const internshipId = req.params.id;
  
    client.none('DELETE FROM internships WHERE id = $1', internshipId)
      .then(() => {
        res.json({ message: 'Internship opportunity deleted successfully' });
      })
      .catch((error) => {
        console.error('Error deleting internship opportunity:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });
  
  module.exports = router;
  
