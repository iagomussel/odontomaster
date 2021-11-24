const moment = require('moment');
const Files = require('../models/Files')
const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');
const axios = require('axios');
class FilesController {

    async find(req, res) {
        const { id } = req.params
        try {
            let file = await Files.findByPk(id);
            res.sendFile(path.join(__dirname, '..', '..', 'uploads', file.name));
        } catch (err) {
            res.status(400).json(err)
        }

    }
    async upload(req, res) {
        const formidable = require('formidable');

        const form = new formidable.IncomingForm();
        await form.parse(req, async (err, fields, files) => {
            const upload_dir = path.join(__dirname, '..', '..', 'uploads')
            if (!fs.existsSync(upload_dir)) {
                fs.mkdirSync(upload_dir);
            }
            const oldPath = files.file.path;
            const fileName = files.file.name + moment().format("ddmmDDMMYYY");
            const newPath = path.join(upload_dir, fileName);
            await fs.renameSync(oldPath, newPath);

            let f = await Files.create({ name: fileName, contentType: files.file.type })

            return res.json(req.protocol + '://' + req.get('host') + req.originalUrl + "/" + f.id);
        });
    }
    async image(req, res) {
        let { term, w, h } = req.params;
        let url = `https://api.unsplash.com/search/photos?page=1&query=${term}&client_id=${process.env.UNSPLASH_KEY}`;
        let response = await axios.get(url);
        if(response.data.results.length == 0 ) return res.json({ message: "Not found" });
        let ind = Math.floor(Math.random() * response.data.results.length) % response.data.results.length; ;

        console.log(response.data.results)
        let image = response.data.results[ind].urls.full;
        return res.json({ image });
    }
};

module.exports = new FilesController();
