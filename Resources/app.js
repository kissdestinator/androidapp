
// create tab group
var tabGroup = Titanium.UI.createTabGroup();
var pointsArray = new Array();

var coordinatesArray = new Array();
var tbl = [];


var map = Ti.UI.createImageView
({
	image: "map2.png",
	width: "100%",
	height:"100%"
});

var circle1 = Ti.UI.createImageView
({
	left :0,
	top:0,
	width: 10,
	height: 10,
	borderRadius:20,
	backgroundColor: 'green'
});

var circle2 = Ti.UI.createImageView
({
	left :0,
	top: 0,
	width: 10,
	height: 10,
	borderRadius:20,
	backgroundColor: 'yellow'
});

var circle4 = Ti.UI.createImageView
({
	left : 300,
	top:150,
	width: 10,
	height: 10,
	borderRadius:20,
	backgroundColor: 'blue'
});


var circle3 = Ti.UI.createImageView
({
	left : 100,
	top:450,
	width: 10,
	height: 10,
	borderRadius:20,
	backgroundColor: 'blue'
});

var circle5 = Ti.UI.createImageView
({
	left : 15,
	top:400,
	width: 10,
	height: 10,
	borderRadius:20,
	backgroundColor: 'blue'
});



//functions


function CheckWebService()
{
	if(pos_x.value == 1)
	{
	var point = CreatePoint(circle2.left, circle2.top, 'red');
	win1.add(point);
	var a = circle3.left - circle1.left;
	var b = circle3.top - circle1.top;
	circle2.left += Math.floor(a / 20);
	circle2.top += Math.floor(b / 20);
	return point;
	}
	if(pos_x.value == 2)
	{
	var point = CreatePoint(circle2.left, circle2.top, 'red');
	win1.add(point);
	var a = circle4.left - circle1.left;
	var b = circle4.top - circle1.top;
	circle2.left += Math.floor(a / 20);
	circle2.top += Math.floor(b / 20);
	return point;
		
	}
	if(pos_x.value == 3)
	{
	var point = CreatePoint(circle2.left, circle2.top, 'red');
	win1.add(point);
	var a = circle5.left - circle1.left;
	var b = circle5.top - circle1.top;
	circle2.left += Math.floor(a / 20);
	circle2.top += Math.floor(b / 20);
	return point;
	}
	
	
	
}

function CreatePoint(x,y,_color)
{
	var pointsCounter = pointsArray.length;
	pointsArray[pointsCounter] =  Ti.UI.createImageView({
			top : y,
			left : x,
			width: 10,
			height: 10,
			borderRadius:50,
			borderColor: 'blue',
			backgroundColor: _color
	});
	return pointsArray[pointsCounter];
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}



function TimeFun()
{
	
	
	if(pos_x.value == 1)
	{
	
		while(circle2.left < circle3.left && circle2.top < circle3.top)
		{
		CreateHistory(circle2.top,circle2.left);
		CheckWebService();
		sleep(100);
		}
	}
	if(pos_x.value == 2)
	{
		while(circle2.left < circle4.left && circle2.top < circle4.top)
		{
		CreateHistory(circle2.top,circle2.left);
		CheckWebService();
		sleep(100);
		}
	}
	if(pos_x.value == 3)
	{
		while(circle2.left < circle5.left && circle2.top < circle5.top)
		{
		CreateHistory(circle2.top,circle2.left);
		CheckWebService();
		sleep(100);
		}
	}
	
}

function CreateHistory(ltop,lleft)
{
	
	label1.text = ltop + "," + lleft;
	coordinatesArray.push(label1.text);
	tbl.push({title:label1.text});
	table.setData(tbl);
	
		
}
var table = Ti.UI.createTableView({
	data:tbl	

});


// Buttons


var pos_x = Titanium.UI.createTextField({
	
	color:'#999',
	top:600,
	left:200,
	width:100,
	height:100,
	keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	hintText: 'pick a position'
});




var buttonOk = Ti.UI.createButton(
{
		title: 'OK',
		top: 600,
		left:30,
		width: 100,
		height: 100,
		
});

buttonOk.addEventListener('click', function(eventObject)
{
	
	TimeFun();
	
	
});



var buttonCancel = Ti.UI.createButton(
{
		title: 'cancel',
		top: 600,
		left : 350,
		width: 100,
		height: 100,
});



buttonCancel.addEventListener('click', function(eventObject)
{
	var i = 0;
	for(i = 0; i< pointsArray.length;i++)
	{
	win1.remove(pointsArray[i]);
	tbl.pop();
	
	}	
});








// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow(
{  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab(
{  
    icon:'KS_nav_views.png',
    title:'Map',
    window:win1
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text: '0,0',
	top: 550,
	left: 30,
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});



win1.add(map);
win1.add(circle1);
win1.add(circle2);
win1.add(circle3);
win1.add(circle4);
win1.add(circle5);
win1.add(buttonOk);
win1.add(label1);
win1.add(pos_x);
win1.add(buttonCancel);



//
// create controls tab and root window
//

var win2 = Titanium.UI.createWindow({  
    title:'Logs',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'History',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'',
	top: 20,
	left: 40,
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);
win2.add(table);

//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  

// open tab group
tabGroup.open();



