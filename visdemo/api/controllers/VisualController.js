/**
 * VisualController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
// action - list
list: async function (req, res) {

    var everyones = await Visual.find();
    
    return res.view('visual/list', { persons: everyones });
},


};

