const app = require("express")();
const async = require("async");

// const app = express();

app.get("/", (req, res) => {
  async.auto(
    {
      first: (cb) => {
        console.log("First");
        cb(null, 1);
      },
      second: [
        "forth",
        (result, cb) => {
          console.log("Second");
          console.log(result);
          cb(null, 2);
        },
      ],
      third: (cb) => {
        console.log("Third");
        cb(null, 3);
      },
      forth: (cb) => {
        console.log("Forth");
        cb(null, 4);
      },
    },
    (err, result) => {
      console.log("Error = ", err);
      console.log("Final = ", result);
      res.send("Auto runed");
    }
  );
});

app.get("/parllel", (req, res) => {
  async.parallel(
    {
      first: (cb) => {
        console.log("First");
        cb(null, 1);
      },
      second: (cb) => {
        console.log("Second");
        cb(null, 2);
      },
      third: (cb) => {
        console.log("Third");
        cb(null, 3);
      },
      forth: (cb) => {
        console.log("Forth");
        cb(null, 4);
      },
    },
    (err, result) => {
      console.log("Error = ", err);
      console.log("Final = ", result);
      res.send("Auto runed");
    }
  );
});

app.get("/each", (req, res) => {
  let array = [];
  for (let index = 0; index < 5000; index++) {
    array[index] = index + 1;
  }
  console.log("START BABY");
  async.eachLimit(
    array,
    1000,
    (item, cb) => {
      console.log(item);
      cb(null);
    },
    () => {
      console.log("END BABY");
    }
  );
  res.send("Completed");
});

app.get("/water", (req, res) => {
  async.waterfall(
    [
      (cb) => {
        cb(null, 1);
      },
      (result, cb) => {
        cb(null, result, 2);
      },
      (result1, result2, cb) => {
        cb(null, result1 + result2 + 1);
      },
      (result, cb) => {
        cb(null, result + 1);
      },
    ],
    (err, result) => {
      console.log("ERROR = ", err);
      console.log("Result = ", result);
    }
  );
  res.send("Completed");
});

app.get("/series", (req, res) => {
  async.series(
    [
      (cb) => {
        cb(null, 1);
      },
      (cb) => {
        cb(null, 1, 2);
      },
      (cb) => {
        cb(null, 2 + 1);
      },
      (cb) => {
        cb(null, 5);
      },
    ],
    (err, result) => {
      console.log("ERROR = ", err);
      console.log("Result = ", result);
    }
  );
  res.send("Completed");
});

app.listen(3000);
