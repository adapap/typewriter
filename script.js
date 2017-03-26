$(document).ready(function() {

	var specials = { //Illegal CSS characters
		".": "period",
		",": "comma",
		":": "colon",
		";": "semicolon",
		"‘": "leftquote", //Quotes not supported
		"'": "rightquote",
		"“": "leftquotes",
		"”": "rightquotes",
		"!": "exclamation",
		"?": "question"
	};

	$("#charInputSubmit").click(function() { //Convert text to handwriting
		$("#preview").text("");
		$input = $("#charInput").val();
		$output = "";
		$charArray = $input.split("");
		$spaces = [];

		//Line wrap handler
		$array2 = [];
		$mx = $charArray.length;
		$temp=0;
		$location=0;
		$x=0;
		while($x<$mx)
		{
			if ($location==23)
			{
				$location=0;
			}
			if($charArray[$x]==" ")
			{
				$array2.push(" ");
				$temp=0;
				$location++;
			}
			else if($temp==0)
			{
				if($location!=0)
				{
					$z=-1;
					for($y=$x+1;$y<$mx;$y++)
					{
						if($charArray[$y]==" ")
						{
							$z=$y-$x+1;
							$y=$mx+1;
						}
					}
					if($z<0)
					{
						$z=$mx-$x;
					}
					if($location+$z>23)
					{
						for($y=$location+1;$y<=23;$y++)
						{
							$array2.push(" ");
						}
						$array2.push($charArray[$x]);
						$location=1;
						temp=1;
					}
					else
					{
						$array2.push($charArray[$x]);
						$temp=1;
						$location++;
					}
				}
				else
				{
					$array2.push($charArray[$x]);
					$temp=1;
					$location++;
				}
			}
			else
			{
					$array2.push($charArray[$x]);
					$location++;
			}
			$x++;
		}
		console.log($array2);
		//Display Preview
		for(i=0; i<$array2.length; i++) {
			$rand = randBetween(1,5);
			if ($array2[i] == " " || $array2[i] == `
`) {
				$output += `<div class="char char-space"></div>`; //Check if char is a space, tab, or newline
			}
			else if (!!$array2[i].match(/^[.,:;?!']/)) {
				$char = specials[$array2[i]];
				$output += `<div class="char char-${$char}${$rand}"></div>`;
			}
			else {
				$char = $array2[i];
				$output += `<div class="char char-${$char}${$rand}"></div>`;
			}
		}
		console.log("Successfully converted file.");
		$("#preview").append($output);
	});

	function randBetween(a, b) {
		return Math.floor(Math.random() * b) + a;  
	}

	$("#genPDF").click(function() {
		$("#preview").print();
	});
});

//Print Function
function printElem(elem)
		{
		    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

		    mywindow.document.write('<html><head><link rel="stylesheet" href="hack.css"><link rel="stylesheet" href="main.css"><title>' + document.title  + '</title>');
		    mywindow.document.write('</head><body >');
		    mywindow.document.write('<h1>' + document.title  + '</h1>');
		    mywindow.document.write(document.getElementById(elem).innerHTML);
		    mywindow.document.write('</body></html>');

		    mywindow.document.close(); // necessary for IE >= 10
		    mywindow.focus(); // necessary for IE >= 10*/

		    mywindow.print();
		    mywindow.close();

		    return true;
		}