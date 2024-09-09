 function showResult() {
			
			var error = document.getElementById('error');
			var boolMobNum = false;
			var nameInput = document.getElementById('inputValueName').value;			
            var rollNumInput = document.getElementById('inputValue').value;
			//var mobileInput = document.getElementById('inputValueCellNo').value;
			//var dobInput = document.getElementById('inputValueDob').value;
			
			   // Check if the input is a 10-digit number
           /* if (/^\d{10}$/.test(mobileInput)) {
				boolMobNum = true;
                error.style.display = 'none';
                //alert('Mobile number is valid!');
            } else {
				boolMobNum = false;
                error.style.display = 'block';
				alert('Mobile number is Invalid!');
            }*/		
			
			if ( nameInput !="" && rollNumInput !=""){
				boolMobNum = true;
			}
			
			if ( boolMobNum ) {
            //document.getElementById('resultDisplay').innerText = inputValueName + ' Marks is : ' + inputValue;
				// Excel Data Read and show 
			var retMarks = readExcelData ( nameInput , rollNumInput)
			//document.getElementById('resultDisplay').innerText = 'Dear '+ nameInput + ', you have scored 120 out of 200 marks.' ;
			//document.getElementById('resultDisplay').style.backgroundColor = 'green';
			} else {
				document.getElementById('resultDisplay').innerText = 'Please enter correct details to see your result !!!!'
				document.getElementById('resultDisplay').style.backgroundColor = 'red';
			}
			
		
			//alert ('return Marks is --->'+retMarks)
		
            
			
 }

		
function readExcelData(inputName,inputRollNum) {

	var resultMarks ='NA'
	var resultName ='NA'
	var resultRoll ='NA'
    const token = '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'; // Replace with your actual token
    const owner = 'AnkushKanrar'; // Replace with the repository owner's username
    const repo = 'DataProcess'; // Replace with your repository name
    const path = 'ResultData2.csv'; // Replace with the path to your CSV file in the repository

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    fetch(apiUrl, {
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3.raw'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
		//alert ('data-->'+data)
		const jsonArray = csvToJson(data);
		console.log ('Name-------------->'+inputName)
		console.log ('Roll Number------->'+inputRollNum)
		//console.log (jsonArray)
         //document.getElementById('csvData').textContent = json;		 
		 //var inputName = 'Bharat' 
		 resultName = inputName.toUpperCase();
		 console.log ('Name in Upper -------------->'+resultName)
		 const transformedArray = jsonArray.map(item => {
			return {
				Name: item.Name.toUpperCase().replace(/\s+/g, ''),
				DOB: item.DOB,
				MobileNumber: item.MobileNumber,
				Marks: item.Marks,
				Remarks: 'NA'
			};
		});

			
		//console.log (transformedArray);
		 
		 const student = transformedArray.find(item => item.Name === resultName);
		 //let value;
			if (student === null || typeof student === 'undefined') {
				console.log('Value is null or undefined');
				document.getElementById('resultDisplay').innerText = 'Please enter correct details to see your result !!!!'
				document.getElementById('resultDisplay').style.backgroundColor = 'red';
			}
			else 
			{		 
				 console.log(student);
				 console.log(student.MobileNumber); 
				 resultMarks = student.Marks ;
				 console.log(student.Marks );
			
				 document.getElementById('resultDisplay').textContent =  'Dear '+ inputName + ', you have scored '+resultMarks+' out of 200 marks.' ;
				 document.getElementById('resultDisplay').style.backgroundColor = 'green';
				 //document.getElementById('resultDisplay').textContent = jsonArray.stringify(json, null, 2);
			}
    })
    .catch(error => console.error('Error fetching the CSV file:', error));
	
	
	//return resultMarks;
	
};	


		
		

function csvToJson(csv) {
	//alert ('Incoming CSV--->'+csv)
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    const jsonData = [];
	//alert ('Incoming CSV Headers--->'+headers)
	//alert ('Incoming CSV Lines--->'+lines)
    for (let i = 1; i < lines.length; i++) {
		 if (!lines[i])
            continue
        const obj = {};
        const currentLine = lines[i].split(',');


		headers.forEach((header, index) => {
				//let cellVal   = currentLine[index].replaceAll(" ", "");;
				//let headerVal = header.split("").replaceAll(" ", "");
				if ( currentLine[index] !="") {
					//alert (cellVal)
					obj[header] = currentLine[index];
				}
			});
	   

        jsonData.push(obj);
    }

    return jsonData;
}

