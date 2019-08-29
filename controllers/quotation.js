const Quotation = require('../models/quotation');

exports.quotation_get_all = (req, res) => {
    Quotation.find()
        .exec()
        .then(items => {
            const response = {
                quotation: items.map(item => {
                    return item;
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.create_quotation = async (req, res) => {
    const quotation = new Quotation({
        bgColor: req.body.bgColor,
        sentence: req.body.sentence,
        from: req.body.from,
    });
    try{
        const savedQuotation = await quotation.save();
        res.json(savedQuotation);
    } catch(err){
        res.json({message: err})
    }
}

exports.delete_quotation = async (req, res) => {
    try{
        const removedQuotation = await Quotation.deleteOne({ _id: req.params.quotationId });
        res.json(removedQuotation);
    }catch(err){
        res.json({ message: err });
    }
}

exports.update_quotation = async (req, res, next) => {
    try{
        const updatedQuotation = await Quotation.updateOne(
            { _id: req.params.quotationId }, 
            { $set: {
                bgColor: req.body.bgColor,
                sentence: req.body.sentence,
                from: req.body.from,
            }}
        );
        res.status(200).json(updatedQuotation);
        // next();
    }catch(err){
        res.status(500).json({ message: err })
    }
};

