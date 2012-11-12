// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#056');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1= Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Map',
    window:win1
});


var label1 = Titanium.UI.createLabel({
	color:'#492',
	text:'Map will be here',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
	
});

var but = Titanium.UI.createButton({
	title: 'click',
	height:100,
	width :100,
	top:50,
	left: 300,
	
});
var image = Ti.UI.createImageView({Image:'/example/Resources/DSCF2075.JPG', height: 50, width: 50, left : 0, top :100});	
but.addEventListener('click',function(e){
	win1.add(image);
	
});



win1.setBackgroundImage(image);
win1.add(image);
win1.add(label1);
//win1.add(but);


//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'tab2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'History',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'History here',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);

  

var win3 = Titanium.UI.createWindow({  
    title:'tab3',
    backgroundColor:'#fff'
    });
    
    // od tego miejsca zostalo dodane
    
//przyciski do Destination    
var buttonOk = Titanium.UI.createButton({
	title :'OK',
	top: 600,
	left :30,
	width : 100,
	height : 100,
});
buttonOk.addEventListener('click', function(e){
//var image = Ti.UI.createImageView({Image:'DSCF2075.JPG', height: 50, width: 50, left : 0, top :100});	
//win3.add(image);
});

var buttonCancel = Titanium.UI.createButton({
	title : 'cancel',
	top: 600,
	left :300,
	width: 100,
	height : 100,
});

buttonCancel.addEventListener('cancel', function(e){
	win3.close()});
//koniec przyciskow


var text1 = Titanium.UI.createTextField({
	
	color:'#456',
	top:200,
	left:100,
	width:250,
	height:40,
	keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
/*
text1.addEventListener('return', function(e){
	l.text = e.value;
	text1.blur();	
});
*/

// do tego miejsca
var tab3 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Destination',
    window:win3
});



var label3 = Titanium.UI.createLabel({

	color:'#999',
	text:'Please enter destination',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});


win3.add(label3);
win3.add(text1);
win3.add(buttonOk);
win3.add(buttonCancel);


//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);

// open tab group
tabGroup.open();
