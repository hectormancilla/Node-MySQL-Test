const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer', (err, customers) => {
            if (err) {
                console.log(err);
                res.json(err);              
            }
            
            console.log(customers);
            res.render('customers', {
                data: customers
            });
        });
        
    });
};

controller.save = ( req , res ) => {
    const data = req.body;
    req.getConnection((err, conn)=>{
        conn.query('INSERT INTO customer set ?', [data], (err, customer) => {
            console.log(customer);
            res.redirect('/');
        });
    });
};

controller.delete = ( req , res ) => {
    const { id } = req.params;
    req.getConnection((err, conn)=>{
        conn.query('DELETE FROM customer where id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    });
};

controller.edit = ( req , res ) => {
    const { id } = req.params;
    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM customer where id = ?', [id], (err, rows) => {
            res.render('customer_edit', {
                data: rows[0]
            });
        });
    });
};

controller.update = ( req , res ) => {
    const { id } = req.params;
    const newCustomer = req.body;
    req.getConnection((err, conn)=>{
        conn.query('UPDATE customer set ? where id = ?',[newCustomer, id], (err, rows) => {
            res.redirect('/');
        });
    });
};



module.exports = controller;