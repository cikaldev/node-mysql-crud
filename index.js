const path = require('path');
const express = require('express');
const app = express();
const db = require('./koneksi');
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')));


app.get('/', (req, res, next) => {
  db.query("select * from guru order by nama asc", (err, rows) => {
    if (err) {
      res.send(err);
    }
    res.render('list_guru', {guru: rows});
  });
});

app.all('/tambah', (req, res, next) => {
  if (req.method == 'POST') {
    const { nama, mapel } = req.body;
    db.query(
      "insert into guru(nama, mapel) values(?,?)",
      [nama, mapel],
      (err, lastId) => {
        if (err) { res.send(err); }
        console.log('data berhasil ditambahkan, id:', lastId);
        res.redirect('/');
      }
    );
  } else {
    res.render('tambah_guru');
  }
});


app.all('/edit/:guruId', (req, res, next) => {
  if (req.method == 'POST') {
    const { nama, mapel } = req.body;
    db.execute(
      "update guru set nama=?, mapel=? where id=?",
      [nama, mapel, req.params.guruId],
      (err, lastId) => {
        if (err) { res.send(err); }
        console.log('data berhasil diperbarui, id:', lastId);
        res.redirect('/');
      }
    );
  } else {
    db.query(
      "select * from guru where id=? limit 1",
      [req.params.guruId],
      (err, row) => {
        if (err) { res.send(err); }
        res.render('edit_guru', {rs: row[0]});
      }
    );
  }
});


app.get('/hapus/:guruId', (req, res, next) => {
  db.execute(
    "delete from guru where id=?",
    [req.params.guruId],
    (err,affectId) => {
      if (err) {
        res.send(err);
      }
      console.log('Data berhasil dihapus, id:', affectId);
      res.redirect('/');
    }
  )
})

app.listen(PORT, ()=>console.log(`Aplikasi jalan di port ${PORT}`));
















