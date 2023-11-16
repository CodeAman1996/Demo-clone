const express = require("express");
const path = require("path");
const Hl7lib = require("nodehl7");
const ExcelJS = require("exceljs");

const app = express();
const port = 3000;

app.use(express.json());

const config = {
  mapping: false,
  profiling: true,
  debug: true,
  fileEncoding: "iso-8859-1",
};

app.get("/download-msh-excel", (req, res) => {
  const filePath = path.join(__dirname, "./csv/Gastrointestinal.hl7");
  const hl7parser = new Hl7lib(config);
  hl7parser.parseFile(filePath, (err, message) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("message", message);
      const mshSegment = message.get("MSH");
      console.log("pidsegment", mshSegment);
      const msh1 = mshSegment.parts[1];
      const msh2 = mshSegment.parts[2];
      const msh5 = mshSegment.parts[5]
      const msh7 = mshSegment.parts[7];
      const msh8 = mshSegment.parts[8];
      const msh9 = mshSegment.parts[9];
      const msh10 = mshSegment.parts[10];
      const msh13 = mshSegment.parts[13];

      const mshWorkbook = new ExcelJS.Workbook();
      const mshWorksheet = mshWorkbook.addWorksheet("MSH Data");

      mshWorksheet.addRow(["mshNo"]);
      mshWorksheet.addRow([
        msh1,
        msh2,
        msh5,
        msh7,
        msh8,
        msh9,
        msh10,
        msh13
      ]);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=msh_data.xlsx"
      );

      mshWorkbook.xlsx.write(res).then(() => {
        res.end();
      });
    }
  });
});


app.get("/download-pid-excel", (req, res) => {
  const filePath = path.join(__dirname, "./csv/Wound.hl7");
  const hl7parser = new Hl7lib(config);
  hl7parser.parseFile(filePath, (err, message) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("message", message);
      const pidSegment = message.get("PID");
      console.log("pidsegment", pidSegment);
      const pid1 = pidSegment.parts[0];
      const patientID = pidSegment.parts[1];
      const patientName = pidSegment.parts[4].join(" ");
      const pid6 = pidSegment.parts[6];
      const pid7 = pidSegment.parts[7];
      const pid10 = pidSegment.parts[10];
      const pid27 = pidSegment.parts[27];

      const pidWorkbook = new ExcelJS.Workbook();
      const pidWorksheet = pidWorkbook.addWorksheet("PID Data");

      pidWorksheet.addRow(["pidNo", "Patient ID", "Patient Name"]);
      pidWorksheet.addRow([
        pid1,
        patientID,
        patientName,
        pid6,
        pid7,
        pid10,
        pid27,
      ]);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=pid_data.xlsx"
      );

      pidWorkbook.xlsx.write(res).then(() => {
        res.end();
      });
    }
  });
});

app.get("/download-orc-excel", (req, res) => {
  const filePath = path.join(__dirname, "./csv/39543.hl7");
  const hl7parser = new Hl7lib(config);
  hl7parser.parseFile(filePath, (err, message) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("message", message);
      const ORCSegment = message.get("ORC");
      console.log("orcsegment", ORCSegment);
      const orc1 = ORCSegment.parts[0];
      const orc2 = ORCSegment.parts[1];
      const orc8 = ORCSegment.parts[8];
      const orc12 = ORCSegment.parts[12];
      const orc16 = ORCSegment.parts[16];

      const orcWorkbook = new ExcelJS.Workbook();
      const orcWorksheet = orcWorkbook.addWorksheet("ORC Data");

      orcWorksheet.addRow(["orcNo", "orcID"]);
      orcWorksheet.addRow([orc1, orc2, orc8, orc12, orc16]);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=orc_data.xlsx"
      );

      orcWorkbook.xlsx.write(res).then(() => {
        res.end();
      });
    }
  });
});

app.get("/download-obr-excel", (req, res) => {
  const filePath = path.join(__dirname, "./csv/Gastrointestinal.hl7");
  const hl7parser = new Hl7lib(config);
  hl7parser.parseFile(filePath, (err, message) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("message", message);
      const ObrSegment = message.get("OBR");
      console.log("obrsegment", ObrSegment);
      const obr1 = ObrSegment.parts[0];
      const obr2 = ObrSegment.parts[1];
      const obr3 = ObrSegment.parts[3];
      const obr5 = ObrSegment.parts[5];
      const obr6 = ObrSegment.parts[6];
      const obr9 = ObrSegment.parts[9];
      const obr10 = ObrSegment.parts[10];
      const obr13 = ObrSegment.parts[13];
      const obr14 = ObrSegment.parts[14];
      const obr15 = ObrSegment.parts[15];
      const obr19 = ObrSegment.parts[19];
      const obr21 = ObrSegment.parts[21];
      const obr24 = ObrSegment.parts[24];
      const obr26 = ObrSegment.parts[26];
   

      const obrWorkbook = new ExcelJS.Workbook();
      const obrWorksheet = obrWorkbook.addWorksheet("OBR Data");

      obrWorksheet.addRow(["obrNo", "obrID"]);
      obrWorksheet.addRow([obr1, obr2, obr3, obr5, obr6,obr9,obr10,obr13,obr14,obr15,obr19,obr21,obr24,obr26]);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=obr_data.xlsx"
      );

      obrWorkbook.xlsx.write(res).then(() => {
        res.end();
      });
    }
  });
});
app.get("/download-obx-excel", (req, res) => {
  const filePath = path.join(__dirname, "./csv/Wound.hl7");
  const hl7parser = new Hl7lib(config);
  hl7parser.parseFile(filePath, (err, message) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const obxSegments = message.segments.filter(
        (segment) => segment.typeofSegment === "OBX"
      );
      console.log("obxsegment", obxSegments);

      const obxWorkbook = new ExcelJS.Workbook();
      const obxWorksheet = obxWorkbook.addWorksheet("OBX Data");

      obxWorksheet.addRow([
        "OBX Value",
        "Value",
        "value",
        "value",
        "value",
        "value",
        "value",
        "value",
        "value",
        "value",
        "value",
        "value",
        "value",
        "value",
        "Date and Time",
      ]);

      obxSegments.forEach((obxSegment) => {
        const obx1 = obxSegment.parts[0];
        const obx2 = obxSegment.parts[1];
        const obx3 = obxSegment.parts[2];
        const obx4 = obxSegment.parts[3];
        const obx5 = obxSegment.parts[4];
        const obxValueArray = obxSegment.parts[5];
        const obx6 = obxSegment.parts[6];
        const obx7 = obxSegment.parts[7];
        const obx8 = obxSegment.parts[8];
        const obx9 = obxSegment.parts[9];
        const obx10 = obxSegment.parts[10];
        const obx11 = obxSegment.parts[11];
        const obx12 = obxSegment.parts[12];
        const obxDateTime = obxSegment.parts[13];
        const obx14 = obxSegment.parts[14];
        console.log("obxDateTime", obxDateTime);
        obxWorksheet.addRow([
          obx1,
          obx2,
          obx3,
          obx4,
          obx5,
          obx6,
          obx7,
          obx7,
          obx8,
          obx9,
          obx10,
          obx11,
          obx12,
          obxValueArray,
          obxDateTime,
          obx14,
        ]);
      });

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=obx_data.xlsx"
      );

      obxWorkbook.xlsx.write(res).then(() => {
        res.end();
      });
    }
  });
});

app.get("/download-zud-excel", (req, res) => {
  const filePath = path.join(__dirname, "./csv/39543.hl7");
  const hl7parser = new Hl7lib(config);
  hl7parser.parseFile(filePath, (err, message) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("message", message);
      const ZUDSegment = message.get("ZUD");
      console.log("zudsegment", ZUDSegment);
      const zud = ZUDSegment.parts;
      
      const zudWorkbook = new ExcelJS.Workbook();
      const zudWorksheet = zudWorkbook.addWorksheet("ORC Data");

      zudWorksheet.addRow(["zudData"]);
      zudWorksheet.addRow([zud]);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=zud_data.xlsx"
      );

      zudWorkbook.xlsx.write(res).then(() => {
        res.end();
      });
    }
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
