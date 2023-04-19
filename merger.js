const PDFMerger = require('pdf-merger-js');

const merger = new PDFMerger();

const mergerFunc=async (file1,file2) => {
  await merger.add(file1);  //merge all pages. parameter is the path to file and filename.
  await merger.add(file2); // merge only page 2
 const d=Date.now();

  await merger.save(`public/${d}.pdf`); //save under given name and reset the internal document
  return d
  // Export the merged PDF as a nodejs Buffer
  // const mergedPdfBuffer = await merger.saveAsBuffer();
  // fs.writeSync('merged.pdf', mergedPdfBuffer);
}
module.exports = mergerFunc