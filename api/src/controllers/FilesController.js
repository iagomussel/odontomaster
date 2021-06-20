const moment=require('moment');
const Files = require('../models/Files')
const fs = require('fs');
const path = require('path');

class FilesController {

    async find(req, res){
        const {id} = req.params
        try{
            let file = await Files.findByPk(id);
            res.sendFile(path.join(__dirname, '..', '..', 'uploads',file.name));
        } catch(err){
            res.status(400).json(err)
        }

    }
  async upload(req, res) {
    const formidable = require('formidable');

    const form = new formidable.IncomingForm();
    await form.parse(req, async (err, fields, files) => {

        const oldPath = files.file.path;
        const fileName = files.file.name + moment().format("ddmmDDMMYYY");
        const newPath = path.join(__dirname, '..','..','uploads', fileName);
        await fs.renameSync(oldPath, newPath);

        let f = await Files.create({ name: fileName, contentType:files.file.type})
        console.log(req.protocol + '://' + req.get('host') + req.originalUrl)
        return res.json(req.protocol + '://' + req.get('host') + req.originalUrl+"/"+f.id);
    });
  }
};

module.exports= new FilesController();
