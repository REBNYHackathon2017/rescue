const router = require('express').Router();

const { Reports } = require('../../db');


router.use('/:reportId', (req, res, next) => {
	Reports.findById(req.params.reportId)
		.then(report => {
			if (report) {
				req.report = report;
				next();
			}
			else res.send('Report not found');
		})
		.catch(next);
});

router.get('/', (req, res, next) => {
	Reports.findAll({ raw: true })
		.then((reports = []) => res.status(200).json(reports))
		.catch(next);
});

router.post('/', (req, res, next) => {
	Reports.create(req.body, { returning: true })
		.then(newReport => res.status(201).json(newReport))
		.catch(next);
});

router.get('/:reportId', (req, res, next) => res.status(200).json(req.report));

router.put('/:reportId', (req, res, next) => {
	const report = req.report.get();
	// Build fresh update object (rather than put user input straight into the DB)
	const update = {};
	for (let key in req.body) {
		if (report.hasOwnProperty(key)) {
			update[key] = req.body[key];
		}
	}

	req.report.update(update, { returning: true })
		.then(updatedReport => res.status(201).json(updatedReport.get()))
		.catch(next);
});

router.delete('/:reportId', (req, res, next) => {
	req.report.destroy()
		.then(() => res.status(204).send(`Report ${req.param.reportId} deleted.`))
		.catch(next);
});


module.exports = router;
