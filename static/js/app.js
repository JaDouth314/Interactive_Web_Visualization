
// Global variable to use to get data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


/// -- Creating the bar graph -- ///
function barGraph(sampleID)
{
    console.log(`show barGraph(${sampleID})`);

    d3.json(url).then(data => {
        //collect the data from the json
        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleID);
        let result = resultArray[0];
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        //Create the yticks for the graph by using map() to grab the otu_ids in the array
        let yticks = otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse();
        //create a trace object
        let barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: 'bar',
            text: otu_labels.slice(0, 10).reverse(),
            orientation: `h`
        };
        //Put the trace object into an array
        let barArray = [barData];

        //create a bar layout object
        let barLayout = {
            title: `Top Bacteria Found`,
        };
        
        //Plot the graph
        Plotly.newPlot("bar", barArray, barLayout)
    });
}
// ** Code provided by Instructor Dom from Homework 14 tutorial ** //


/// -- Creating the bubble graph -- ///
function bubbleGraph(sampleID)
{
    console.log(`show bubbleGraph(${sampleID})`);

    d3.json(url).then(data => {
        //collect the data from the json
        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleID);
        let result = resultArray[0];
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        //Create a trace object
        let bubbleData = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids
            }
        };

        //Put the trace object into an array
        let bubbleArray = [bubbleData];

        //create a bar layout object
        let bubbleLayout = {
            title: `Bacteria per Samples`,
            margin: {t: 30},
            hovermode: `closest`,
            xaxis: {title: `OTU ID`}
        };

         //Plot the graph
         Plotly.newPlot("bubble", bubbleArray, bubbleLayout)
    });
}
// ** Code provided by Instructor Dom from Homework 14 tutorial ** //


/// -- Create metadata/demographic table -- ///
function metaData(sampleID)
{
    console.log(`show metaData(${sampleID})`);

    let selector = d3.select("#sample-metadata")

    d3.json(url).then(data => {
        let metadata = data.metadata;
        // for (let i = 0; i < metadata.length; i++){
        //     let tabledata = metadata[i];
        //     selector.append('option').text(tabledata);
        // };

        let resultsArray = metadata.filter(m => m.id == sampleID);
        let result = resultsArray[0];
        console.log(result);


        let id = result.id;
        let ethnicity = result.ethnicity;
        let gender = result.gender;
        let age = result.age;
        let location = result.location;
        let bbtype = result.bbtype;
        let wfreq = result.wfreq;

        metaDemoInfo = `ID: ${id} <br> Ethnicity: ${ethnicity} <br> Gender: ${gender} <br> Age: ${age} <br> Location: ${location} <br> BBType: ${bbtype} <br> WFreq: ${wfreq}`
        document.getElementById('sample-metadata').innerHTML = metaDemoInfo;
    });
}

function optionChanged(sampleID)
{
    console.log(`optionChaged: ${sampleID}`);
    barGraph(sampleID);
    bubbleGraph(sampleID);
    metaData(sampleID);
}
// ** Code provided by Instructor Dom from Homework 14 tutorial ** //

function fillDropdown()
{
    //Initialize the dropdown
    let selector = d3.select("#selDataset");

    //Get a handle to the dropdown
    d3.json(url).then(data => {
        console.log(`Here's the data:`, data);

        //Create a variable to help with for loop and populating the dropdown table
        let sampleNames = data.names;
        //console.log(`The sample names:`, sampleNames);

        //For loop to populate dropdown table with subject ids
        for (let i = 0; i < sampleNames.length; i++) {
            let sampleID = sampleNames[i];
            //console.log(`Sample ID = ${sampleID}`);
            selector.append("option").text(sampleID);
        };
    //Read the current dropdown value
    let initialID = selector.property("value");
    console.log(`initialId = ${initialID}`);

    //Draw a bargraph of the selected value
    barGraph(initialID);
    //Draw a bubble graph of the selected value
    bubbleGraph(initialID);
    //Show meta/demographic data
    metaData(initialID);
    });


    // ** Code provided by Instructor Dom from Homework 14 tutorial ** //
}

fillDropdown();