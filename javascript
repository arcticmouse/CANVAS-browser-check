<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="http://code.jquery.com/jquery-migrate-1.2.1.js"></script>
<script src="http://www.java.com/js/deployJava.js"></script>
<script type="text/javascript">
//
// http://thecodeabode.blogspot.com
// @author: Ben Kitzelman
// @license:  FreeBSD: (http://opensource.org/licenses/BSD-2-Clause) Do whatever you like with it
// @updated: 03-03-2013
//
var getAcrobatInfo = function() {
 
  var getBrowserName = function() {
    return this.name = this.name || function() {
      var userAgent = navigator ? navigator.userAgent.toLowerCase() : "other";
 
      if(userAgent.indexOf("chrome") > -1)        return "chrome";
      else if(userAgent.indexOf("safari") > -1)   return "safari";
      else if(userAgent.indexOf("msie") > -1)     return "ie";
      else if(userAgent.indexOf("firefox") > -1)  return "firefox";
      return userAgent;
    }();
  };
 
  var getActiveXObject = function(name) {
    try { return new ActiveXObject(name); } catch(e) {}
  };
 
  var getNavigatorPlugin = function(name) {
    for(key in navigator.plugins) {
      var plugin = navigator.plugins[key];
      if(plugin.name == name) return plugin;
    }
  };
 
  var getPDFPlugin = function() {
    return this.plugin = this.plugin || function() {
      if(getBrowserName() == 'ie') {
        //
        // load the activeX control
        // AcroPDF.PDF is used by version 7 and later
        // PDF.PdfCtrl is used by version 6 and earlier
        return getActiveXObject('AcroPDF.PDF') || getActiveXObject('PDF.PdfCtrl');
      }
      else {
        return getNavigatorPlugin('Adobe Acrobat') || getNavigatorPlugin('Chrome PDF Viewer') || getNavigatorPlugin('WebKit built-in PDF');
      }
    }();
  };
 
  var isAcrobatInstalled = function() {
    return !!getPDFPlugin();
  };
 
  var getAcrobatVersion = function() {
    try {
      var plugin = getPDFPlugin();
 
      if(getBrowserName() == 'ie') {
        var versions = plugin.GetVersions().split(',');
        var latest   = versions[0].split('=');
        return parseFloat(latest[1]);
      }
 
      if(plugin.version) return parseInt(plugin.version);
      return plugin.name
      
    }
    catch(e) {
      return null;
    }
  }
 
  //
  // The returned object
  // 
  return {
    browser:        getBrowserName(),
    acrobat:        isAcrobatInstalled() ? 'installed' : false,
    acrobatVersion: getAcrobatVersion()
  };
}; 
 
 
//detect if JS is working or not
$( "#noshow" ).css('display', 'none');
 
//find browser and version
navigator.sayswho= (function(){
	  var N = navigator.appName, ua= navigator.userAgent, tem;
	  var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
	  if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
	  M = M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
	  return M;
 })();

var $browse = navigator.sayswho;


//if flash version > 9, they have flash
var $flash = false;
	if (swfobject.hasFlashPlayerVersion("9.0.18")) {
	  $flash = true;
	}

//java plugin required for conferences from http://docs.oracle.com/javase/tutorial/deployment/deploymentInDepth/jreVersionCheck.html
var $javaPlugin = false;
if (deployJava.versionCheck('1.6+')) {
	$javaPlugin = true;
	}
	
//find ability to view pdf in browser
var $info = getAcrobatInfo();
//alert(info.browser+ " " + info.acrobat + " " + info.acrobatVersion);
	
//cookies enabled
var $cookiesEnabled = navigator.cookieEnabled;

$( "#compatability" ).append('<table width=100 class=\"noBord\"><tbody>');
$( "#compatability" ).append('<tr>');
$( "#compatability" ).append('<td><strong>Browser & Version</strong></td><td>'+$browse+'</td>');
	if ($.browser.msie) { 
		$( "#compatability" ).append('<td><img src=\"/images/rDot.png\"></td><td>You appear to be using Internet Explorer. To enjoy the full features of Canvas, it is recommended that you use <a href=\"http://www.mozilla.org/en-US/firefox/fx\">Firefox</a>, <a href=\"https://www.google.com/intl/en/chrome/browser\">Chrome</a>, or <a href=\"http://www.apple.com/safari\">Safari(Mac Only)</a></td></tr>'); 
		}
		else $( "#compatability" ).append('<td><img src=\"/images/greenDot.png\"></td></tr>'); 

$( "#compatability" ).append('<tr>');
$( "#compatability" ).append('<td><strong>Flash Installed</strong></td><td>'+$flash+'</td>');
	if (!$flash) {
		$( "#compatability" ).append('<td><img src=\"/images/rDot.png\"></td><td>Please <a href=\"http://get.adobe.com/flashplayer\">install the latest version of Flash</a> to view media and upload files on Canvas</td></tr>');
		}
		else $( "#compatability" ).append('<td><img src=\"/images/greenDot.png\"></td></tr>'); 	

$( "#compatability" ).append('<tr>');	
$( "#compatability" ).append('<td><strong>Java Plugin Installed</strong></td><td>'+$javaPlugin+'</td>');
	if (!$javaPlugin) {
		$( "#compatability" ).append('<td><img src=\"/images/rDot.png\"></td><td>Please <a href=\"http://www.java.com/en/download/index.jsp">install the latest version of Java</a> to view and participate in Canvas conferences</td></tr>');
		}
		else $( "#compatability" ).append('<td><img src=\"/images/greenDot.png\"></td></tr>'); 	

$( "#compatability" ).append('<tr>');
$( "#compatability" ).append('<td><strong>PDF Display Installed</strong></td><td>'+$info.acrobat+'</td>');
	if (!$info.acrobat) {
		$( "#compatability" ).append('<td><img src=\"/images/rDot.png\"></td><td>Please <a href=\"http://get.adobe.com/reader/">install the latest version of Adobe Acrobat</a> to view PDFs in your browser</td></tr>');
		}
		else $( "#compatability" ).append('<td><img src=\"/images/greenDot.png\"></td></tr>'); 	


$( "#compatability" ).append('<tr>');
$( "#compatability" ).append('<td><strong>Cookies enabled</strong></td><td>'+$cookiesEnabled+'</td>'); 
	if (!$cookiesEnabled) {
		$( "#compatability" ).append('<td><img src=\"/images/rDot.png\"></td><td>Please consider <a href=\"http://www.wikihow.com/Enable-Cookies-in-Your-Internet-Web-Browser\"> enabling cookies</a> on your browser.</td></tr>');
		}
		else $( "#compatability" ).append('<td><img src=\"/images/greenDot.png\"></td></tr>'); 	

$( "#compatability" ).append('</tbody></table>');

</script>
 
