adiptal.studio.settings[ "studio-iframe" ] = {
	relative_url : "https://raw.githubusercontent.com/adiptal/studio/main/docs/",
	"font_family": {
		"list" : {
			"Roboto": "'Roboto', sans-serif",
			'Arial' : 'Arial, Helvetica, sans-serif',
			'Tahoma' : 'Tahoma, Verdana, sans-serif',
			'Trebuchet MS' : "'Trebuchet MS', Helvetica, sans-serif",
			'Times New Roman' : "'Times New Roman', Times, serif",
			'Georgia' : 'Georgia, serif',
			'Garamond' : 'Garamond, serif',
			'Courier New' : "'Courier New', Courier, monospace",
			'Geneva' : 'Geneva, Verdana, sans-serif'
		},
		"links" : ['<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">']
	},
	"metadata": {
		"tags": 5,
		"categories": {
			"demo-1": "Demo 1",
			"demo-2": "Demo 2",
			"demo-3": "Demo 3",
			"demo-4": "Demo 4",
			"demo-5": "Demo 5"
		}
	},
	"addon_features": [
		"blockstyle",
		"text",
		"font",
		"whitespace",
		"date-time",
		"emojis-special-chars",
		"find-replace",
		"toggle-view",
		"html-output"
	]
};
adiptal.studio.init( document.querySelector( '[name="studio-iframe"]' ) );

document.addEventListener( 'adiptal_studio_live' , function( event ){
	document.querySelector('.edit-page').click();
});


fetch('import.json')
.then((response) => response.json())
.then((data) => {
    document.querySelector( 'article.adiptal-ui' ).innerHTML += data.content;
});


// TOGGLE THEME
window.addEventListener( 'DOMContentLoaded' , function(event){
    if( localStorage.getItem( 'adiptal_theme' ) == 'dark_mode' )
    {
        document.querySelector( '.toggle-theme' ).click();
    }
});
document.addEventListener( 'adiptal_studio_live' , function(event){
    if( localStorage.getItem( 'adiptal_theme' ) )
    {
        adiptal.studio.toggleTheme( document.querySelector( 'iframe[name="studio-iframe"]' ) , localStorage.getItem( 'adiptal_theme' ).split('_')[0] );
    }
    else
    {
        adiptal.studio.toggleTheme( document.querySelector( 'iframe[name="studio-iframe"]' ) , 'light' );
    }

adiptal.studio.manageImages(
    document.querySelector( '[name="studio-iframe"]' ) ,
    [
        'https://raw.githubusercontent.com/adiptal/studio/main/docs/img/241022081158094991.webp',
        'https://raw.githubusercontent.com/adiptal/studio/main/docs/img/241022081522941246.webp',
        'https://raw.githubusercontent.com/adiptal/studio/main/docs/img/241022081640978271.webp',
        'https://raw.githubusercontent.com/adiptal/studio/main/docs/img/banner.png',
        'https://raw.githubusercontent.com/adiptal/studio/main/docs/img/banner-2.png',
        'https://raw.githubusercontent.com/adiptal/studio/main/docs/img/banner-3.png',
        'https://raw.githubusercontent.com/adiptal/studio/main/docs/img/banner-4.png',
        'https://raw.githubusercontent.com/adiptal/studio/main/docs/img/banner-5.png'
 ]
);

var fileOptions = {
    allow_comments : 1
    ,is_draft : 0
    ,is_featured : 1
    ,scheduled_at : {
        value : new Date(),
        min_date : new Date(),
        max_date : new Date( new Date().getTime() + ( 5*24*60*60*1000 ) )
    }
    ,approveFile : true
    ,deleteFile : true
};
adiptal.studio.addFileOptions( document.querySelector( '[name="studio-iframe"]' ) , fileOptions );
});

document.addEventListener( 'click' , function(event){
    if( event.target.matches( '.toggle-theme' ) )
    {
        document.querySelector( 'html' ).classList.toggle( 'dark_mode' );
        adiptal.studio.toggleTheme( document.querySelector( 'iframe[name="studio-iframe"]' ) );

        if( document.querySelector( 'html.dark_mode' ) )
        {
            localStorage.setItem( 'adiptal_theme' , 'dark_mode' );
            document.querySelector( '[href*="intellij-light.min.css"]' )
                .setAttribute( 'href' , 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/vs2015.min.css' );
        }
        else
        {
            localStorage.removeItem( 'adiptal_theme' );
            document.querySelector( '[href*="vs2015.min.css"]' )
                .setAttribute( 'href' , 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/intellij-light.min.css' );
        }
    }
});

document.addEventListener( 'click' , function(event){
    var target = event.target;
    if( target.matches( '.edit-page' ) )
    {
        if( document.querySelector( 'iframe[name="studio-iframe"]' ).style.display != 'block' )
        {
            var content = document.querySelector('.adiptal-ui').cloneNode(true);
            content.querySelector( 'header' ).remove();
            content = content.innerHTML;
    
            document.querySelector( 'iframe[name="studio-iframe"]' ).style.display = 'block';
            document.querySelectorAll('.adiptal-ui section').forEach(function(i){
                i.style.display = 'none';
            });
    
            
            var data = { content : content,
    title :  'Introducing Adiptal Studio — A Next-Generation JavaScript Block Editor'
    ,description : 'Adiptal Studio is packed with advanced features to meet the diverse needs of its users.'
    ,category_index : 'demo-3'
    ,tags : [ 'block-editor' , 'wysiwyg' , 'adiptal' , 'js' , 'plugin' ] };
            adiptal.studio.loadFile( document.querySelector( '[name="studio-iframe"]' ) , data );
        }
        else
        {
            adiptal.studio.reset( document.querySelector( '[name="studio-iframe"]' ) );
            document.querySelector( 'iframe[name="studio-iframe"]' ).style.display = 'none';
            document.querySelectorAll('.adiptal-ui section').forEach(function(i){
                i.style.display = '';
            });
        }
    }
});

document.addEventListener( 'adiptal_studio_saveFile' , function( event ){
    // iframe 'name' attribute
    var iframeName = event.detail[0][0];
    var output = event.detail[0][1];
    
    document.querySelectorAll('.adiptal-ui section').forEach(function(i){
        i.remove();
    });
	document.querySelector( '.adiptal-ui h1' ).innerHTML = output.title;
    document.querySelector( 'article.adiptal-ui' ).innerHTML += output.content;
    
    adiptal.studio.reset( document.querySelector( '[name="studio-iframe"]' ) );
    document.querySelector( 'iframe[name="studio-iframe"]' ).style.display = 'none';
    document.querySelectorAll('.adiptal-ui section').forEach(function(i){
        i.style.display = '';
    });
});
