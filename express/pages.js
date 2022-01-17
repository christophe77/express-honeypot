const pages = [
  {
    url: "/assets/snippets/reflect/snippet.reflect.php?reflect_base=",
    metas: { title: "/MODx/", description: "/MODx/" },
    content:
      "/assets/snippets/reflect/snippet.reflect.php?reflect_base= /MODx/",
  },
  {
    url: "/include/scripts/export_batch.inc.php?DIR=",
    metas: { title: "ModernBill", description: "ModernBill" },
    content: "/include/scripts/export_batch.inc.php?DIR= ModernBill",
  },
  {
    url: "/parse/parser.php?WN_BASEDIR=",
    metas: { title: "WEB//NEWS", description: "WEB//NEWS" },
    content: "/parse/parser.php?WN_BASEDIR= WEB//NEWS",
  },
  {
    url: "/web/?custompluginfile[]=",
    metas: {
      title: "index.php?categoryid=5",
      description: "index.php?categoryid=5",
    },
    content: "?custompluginfile[]= index.php?categoryid=5",
  },
  {
    url: "/web/?installed_config_file=",
    metas: {
      title: "PhpJobScheduler",
      description: "PhpJobScheduler",
    },
    content: "/web/?installed_config_file= PhpJobScheduler",
  },
  {
    url: "/pjsfiles/modify.php?installed_config_file=",
    metas: {
      title: "PhpJobScheduler",
      description: "PhpJobScheduler",
    },
    content: "/pjsfiles/modify.php?installed_config_file= PhpJobScheduler",
  },
  {
    url: "/errors.php?error=",
    metas: { title: "/com_rwcards", description: "/com_rwcards" },
    content: "errors.php?error= /com_rwcards",
  },
  {
    url: "/vwar/backup/errors.php?error=",
    metas: { title: "errors.php", description: "errors.php" },
    content: "//vwar/backup/errors.php?error= errors.php",
  },
  {
    url: "/s_loadenv.inc.php?DOCUMENT_ROOT=",
    metas: { title: "netcat", description: "netcat" },
    content: "/s_loadenv.inc.php?DOCUMENT_ROOT= netcat",
  },
  {
    url: "/components/com_rwcards/rwcards.advancedate.php?mosConfig_absolute_path=",
    metas: {
      title: "php?option=com_rwcards",
      description: "php?option=com_rwcards",
    },
    content:
      "/components/com_rwcards/rwcards.advancedate.php?mosConfig_absolute_path= php?option=com_rwcards",
  },
  {
    url: "/inc/functions.inc.php?config[ppa_root_path]=",
    metas: { title: "Index", description: "Index" },
    content: "inc/functions.inc.php?config[ppa_root_path]= Index",
  },
  {
    url: "/phphtml.php?htmlclass_path=",
    metas: { title: "phphtml.php", description: "phphtml.php" },
    content: "phphtml.php?htmlclass_path= phphtml.php",
  },
  {
    url: "/web/?path%5Bdocroot%5D=",
    metas: { title: "/newspublish", description: "/newspublish" },
    content: "/web/?path%5Bdocroot%5D= /newspublish",
  },
  {
    url: "/web/?sIncPath=",
    metas: { title: "powered", description: "powered" },
    content: "?sIncPath= powered",
  },
  {
    url: "/plugins/safehtml/HTMLSax3.php?dir[plugins]=",
    metas: { title: "powered", description: "powered" },
    content: "plugins/safehtml/HTMLSax3.php?dir[plugins]= powered",
  },
  {
    url: "/errors.php?error=",
    metas: { title: "powered", description: "powered" },
    content: "errors.php?error= powered",
  },
  {
    url: "/include/plugins/jrBrowser/purchase.php?jamroom[jm_dir]=",
    metas: { title: "powered", description: "powered" },
    content: "include/plugins/jrBrowser/purchase.php?jamroom[jm_dir]= powered",
  },
  {
    url: "/errors.php?error=",
    metas: { title: "/ray.3.5", description: "/ray.3.5" },
    content: "errors.php?error= /ray.3.5",
  },
  {
    url: "/web/?sourcedir=",
    metas: {
      title: "index.php?sourcedir=",
      description: "index.php?sourcedir=",
    },
    content: "?sourcedir= index.php?sourcedir=",
  },
  {
    url: "/errors.php?error=",
    metas: {
      title: "/com_ponygallery",
      description: "/com_ponygallery",
    },
    content: "errors.php?error= /com_ponygallery",
  },
  {
    url: "/web/?page=",
    metas: { title: "/web/?pagedb=?", description: "/web/?pagedb=?" },
    content: "/web/?page= /?pagedb=?",
  },
  {
    url: "/tools/send_reminders.php?noSet=0&includedir=",
    metas: {
      title: "includes/php-dbi.php",
      description: "includes/php-dbi.php",
    },
    content:
      "/tools/send_reminders.php?noSet=0&includedir= includes/php-dbi.php",
  },
  {
    url: "/errors.php?error=",
    metas: { title: "Powered", description: "Powered" },
    content: "errors.php?error= Powered",
  },
  {
    url: "/web/?include_path=",
    metas: { title: "guestbook", description: "guestbook" },
    content: "/web/?include_path= guestbook",
  },
  {
    url: "/web/?include_path=",
    metas: {
      title: "action+poll_ident",
      description: "action+poll_ident",
    },
    content: "/web/?include_path= action+poll_ident",
  },
  {
    url: "/admin/include/lib.module.php?mod_root=",
    metas: { title: "/cmsworks", description: "/cmsworks" },
    content: "/admin/include/lib.module.php?mod_root= /cmsworks",
  },
  {
    url: "/errors.php?error=",
    metas: {
      title: "/com_extcalendar",
      description: "/com_extcalendar",
    },
    content: "errors.php?error= /com_extcalendar",
  },
  {
    url: "/admin/templates/template_thumbnail.php?thumb_template=",
    metas: { title: "Powered", description: "Powered" },
    content: "/admin/templates/template_thumbnail.php?thumb_template= Powered",
  },
  {
    url: "/includes/header.php?c_temp_path=",
    metas: { title: "/header.php", description: "/header.php" },
    content: "/includes/header.php?c_temp_path= /header.php",
  },
  {
    url: "/include/admin.lib.inc.php?site_path=",
    metas: {
      title: "include/lib.inc.php",
      description: "include/lib.inc.php",
    },
    content: "/include/admin.lib.inc.php?site_path= include/lib.inc.php",
  },
  {
    url: "/errors.php?error=",
    metas: { title: "phpkit", description: "phpkit" },
    content: "errors.php?error= phpkit",
  },
  {
    url: "/errors.php?error=",
    metas: {
      title: "/contenido/includes",
      description: "/contenido/includes",
    },
    content: "errors.php?error= /contenido/includes",
  },
  {
    url: "/popup.php?path=",
    metas: { title: "phpkit", description: "phpkit" },
    content: "popup.php?path= phpkit",
  },
  {
    url: "/includes/ktedit/toolbar.php?dirDepth=",
    metas: { title: "ktmlpro", description: "ktmlpro" },
    content: "includes/ktedit/toolbar.php?dirDepth= ktmlpro",
  },
  {
    url: "/web/?custompluginfile%5B%5D=",
    metas: { title: "Subdreamer", description: "Subdreamer" },
    content: "?custompluginfile%5B%5D= Subdreamer",
  },
  {
    url: "/web/?custompluginfile%5B%5D=",
    metas: { title: "Website", description: "Website" },
    content: "?custompluginfile%5B%5D= Website",
  },
  {
    url: "/include/lib.inc.php?site_path=",
    metas: { title: "rgboard", description: "rgboard" },
    content: "include/lib.inc.php?site_path= rgboard",
  },
  {
    url: "/index.php?option=com_virtuemart&page=shop.browse&category_id=&keyword=&manufacturer_id=&Itemid=&mosConfig_absolute_path=",
    metas: {
      title: "/includes/mambo.php",
      description: "/includes/mambo.php",
    },
    content:
      "index.php?option=com_virtuemart&page=shop.browse&category_id=&keyword=&manufacturer_id=&Itemid=&mosConfig_absolute_path= /includes/mambo.php",
  },
  {
    url: "/index.php?option=com_virtuemart&page=shop.browse&category_id=&keyword=&manufacturer_id=&Itemid=&mosConfig_absolute_path=",
    metas: {
      title: "mambo/index.php",
      description: "mambo/index.php",
    },
    content:
      "index.php?option=com_virtuemart&page=shop.browse&category_id=&keyword=&manufacturer_id=&Itemid=&mosConfig_absolute_path= mambo/index.php",
  },
  {
    url: "/demo1/auction_confirmation.inc.php/header.php?prefix=",
    metas: {
      title: "browse.php?id=?",
      description: "browse.php?id=?",
    },
    content:
      "demo1/auction_confirmation.inc.php/header.php?prefix= browse.php?id=?",
  },
  {
    url: "/phpAdsNew/view.inc.php?phpAds_path=",
    metas: {
      title: "auction/index.php",
      description: "auction/index.php",
    },
    content: "phpAdsNew/view.inc.php?phpAds_path= auction/index.php",
  },
  {
    url: "/playing.php/common/db.php?commonpath=",
    metas: { title: "playing.php", description: "playing.php" },
    content: "playing.php/common/db.php?commonpath= playing.php",
  },
  {
    url: "/errors.php?error=",
    metas: { title: "index", description: "index" },
    content: "errors.php?error= index",
  },
  {
    url: "/index.php?option=com_custompages&cpage=",
    metas: {
      title: "com_custompages",
      description: "com_custompages",
    },
    content: "index.php?option=com_custompages&cpage= com_custompages",
  },
  {
    url: "/index2.php?option=com_custompages&cpage=",
    metas: {
      title: "com_custompages",
      description: "com_custompages",
    },
    content: "index2.php?option=com_custompages&cpage= com_custompages",
  },
  {
    url: "/mainbody.php?option=com_custompages&cpage=",
    metas: {
      title: "com_custompages",
      description: "com_custompages",
    },
    content: "mainbody.php?option=com_custompages&cpage= com_custompages",
  },
  {
    url: "/editsite.php?returnpath=",
    metas: { title: "editsite.php", description: "editsite.php" },
    content: "editsite.php?returnpath= editsite.php",
  },
  {
    url: "/slice.php3?GLOBALS[AA_INC_PATH]=",
    metas: {
      title: "slice.php3?GLOBALS[AA_INC_PATH]=",
      description: "slice.php3?GLOBALS[AA_INC_PATH]=",
    },
    content:
      "slice.php3?GLOBALS[AA_INC_PATH]= slice.php3?GLOBALS[AA_INC_PATH]=",
  },
  {
    url: "/files/carprss.php?CarpPath=",
    metas: { title: "by", description: "by" },
    content: "files/carprss.php?CarpPath= by",
  },
  {
    url: "/accounts/inc/include.php?language=0&lang_settings[0][1]=",
    metas: { title: "Powered", description: "Powered" },
    content: "accounts/inc/include.php?language=0&lang_settings[0][1]= Powered",
  },
  {
    url: "/config.inc.php?path_escape=",
    metas: { title: "post", description: "post" },
    content: "config.inc.php?path_escape= post",
  },
  {
    url: "/ipblock.inc.php?path_escape=",
    metas: { title: "post", description: "post" },
    content: "ipblock.inc.php?path_escape= post",
  },
  {
    url: "/ipblock.inc.php?path_escape=",
    metas: { title: "All", description: "All" },
    content: "ipblock.inc.php?path_escape= All",
  },
  {
    url: "/ws/login.php?noSet=0&includedir=",
    metas: { title: "Public", description: "Public" },
    content: "ws/login.php?noSet=0&includedir= Public",
  },
  {
    url: "/vwar/convert/mvcw.php?step=1&vwar_root=",
    metas: { title: "de/vwar", description: "de/vwar" },
    content: "vwar/convert/mvcw.php?step=1&vwar_root= de/vwar",
  },
  {
    url: "/protection.php?action=logout&siteurl=",
    metas: { title: "approved", description: "approved" },
    content: "protection.php?action=logout&siteurl= approved",
  },
  {
    url: "/web/?mosConfig_absolute_path=",
    metas: { title: "Free", description: "Free" },
    content: "?mosConfig_absolute_path= Free",
  },
  {
    url: "/web/?mosConfig_absolute_path=",
    metas: { title: "Joomla", description: "Joomla" },
    content: "?mosConfig_absolute_path= Joomla",
  },
  {
    url: "/plugins/spamx/MassDelete.Admin.class.php?_CONF[path]=",
    metas: { title: "All", description: "All" },
    content: "plugins/spamx/MassDelete.Admin.class.php?_CONF[path]= All",
  },
  {
    url: "/plugins/spamx/MailAdmin.Action.class.php?_CONF[path]=",
    metas: { title: "Powered", description: "Powered" },
    content: "plugins/spamx/MailAdmin.Action.class.php?_CONF[path]= Powered",
  },
  {
    url: "/admin.php?include_path=",
    metas: { title: "Teken", description: "Teken" },
    content: "admin.php?include_path= Teken",
  },
  {
    url: "/includes/db_connect.php?baseDir=",
    metas: { title: "Version", description: "Version" },
    content: "includes/db_connect.php?baseDir= Version",
  },
  {
    url: "/bookmark4u/lostpasswd.php?env[include_prefix]=",
    metas: {
      title: "bookmark4u214\\1234567890",
      description: "bookmark4u214\\1234567890",
    },
    content:
      "bookmark4u/lostpasswd.php?env[include_prefix]= bookmark4u214\\1234567890",
  },
  {
    url: "/protection.php?action=logout&siteurl=",
    metas: { title: "Members", description: "Members" },
    content: "protection.php?action=logout&siteurl= Members",
  },
  {
    url: "/protection.php?action=logout&siteurl=",
    metas: {
      title: "/members.php?id=all",
      description: "/members.php?id=all",
    },
    content: "protection.php?action=logout&siteurl= /members.php?id=all",
  },
  {
    url: "/protection.php?action=logout&siteurl=",
    metas: { title: "view", description: "view" },
    content: "protection.php?action=logout&siteurl= view",
  },
  {
    url: "/accueil.php?menu=",
    metas: {
      title: "asso.fr/accueil.php?menu=",
      description: "asso.fr/accueil.php?menu=",
    },
    content: "accueil.php?menu= asso.fr/accueil.php?menu=",
  },
  {
    url: "/comments-display-tpl.php?config[comments_form_tpl]=",
    metas: { title: "Powered", description: "Powered" },
    content: "comments-display-tpl.php?config[comments_form_tpl]= Powered",
  },
  {
    url: "/modules/Forums/admin/admin_db_utilities.php?phpbb_root_path=",
    metas: {
      title: ".php?name=Forums",
      description: ".php?name=Forums",
    },
    content:
      "modules/Forums/admin/admin_db_utilities.php?phpbb_root_path= .php?name=Forums",
  },
  {
    url: "/modules/PNphpBB2/includes/functions_admin.php?phpbb_root_path=",
    metas: { title: "PNphpBB2", description: "PNphpBB2" },
    content:
      "modules/PNphpBB2/includes/functions_admin.php?phpbb_root_path= PNphpBB2",
  },
  {
    url: "/plugins/spamx/MassDelete.Admin.class.php/geeklog//plugins/spamx/BaseAdmin.class.php?_CONF[path]=",
    metas: { title: "geeklog", description: "geeklog" },
    content:
      "plugins/spamx/MassDelete.Admin.class.php/geeklog//plugins/spamx/BaseAdmin.class.php?_CONF[path]= geeklog",
  },
  {
    url: "/admin.php?include_path=",
    metas: { title: "IP-adres", description: "IP-adres" },
    content: "admin.php?include_path= IP-adres",
  },
  {
    url: "/index.php?strona=",
    metas: {
      title: "/index.php?strona=",
      description: "/index.php?strona=",
    },
    content: "index.php?strona= /index.php?strona=",
  },
  {
    url: "/index1.php?page=",
    metas: {
      title: "/index1.php?page=",
      description: "/index1.php?page=",
    },
    content: "index1.php?page= /index1.php?page=",
  },
  {
    url: "/includes/functions_mod_user.php?phpbb_root_path=",
    metas: { title: "phpBBViet", description: "phpBBViet" },
    content: "includes/functions_mod_user.php?phpbb_root_path= phpBBViet",
  },
  {
    url: "/web/?mosConfig_absolute_path=",
    metas: { title: "Joomla!", description: "Joomla!" },
    content: "?mosConfig_absolute_path= Joomla!",
  },
  {
    url: "/web/?mosConfig_absolute_path=",
    metas: { title: "Joomla", description: "Joomla" },
    content: "?mosConfig_absolute_path= Joomla",
  },
  {
    url: "/language/lang_english/lang_main_album.php?phpbb_root_path=",
    metas: { title: "Czech", description: "Czech" },
    content: "language/lang_english/lang_main_album.php?phpbb_root_path= Czech",
  },
  {
    url: "/index.php?pg=",
    metas: { title: "Search", description: "Search" },
    content: "index.php?pg= Search",
  },
  {
    url: "/administrator/components/com_jjgallery/admin.jjgallery.php?mosConfig_absolute_path=",
    metas: { title: "com_jjgallery", description: "com_jjgallery" },
    content:
      "administrator/components/com_jjgallery/admin.jjgallery.php?mosConfig_absolute_path= com_jjgallery",
  },
  {
    url: "/modules/Neos_Chronos/header.php?base_folder=",
    metas: { title: "Neos_Chronos", description: "Neos_Chronos" },
    content: "modules/Neos_Chronos/header.php?base_folder= Neos_Chronos",
  },
  {
    url: "/historytemplate.php?cms[support]=1&cms[tngpath]=",
    metas: { title: "powered", description: "powered" },
    content: "historytemplate.php?cms[support]=1&cms[tngpath]= powered",
  },
  {
    url: "/includes/messages.inc.php?include_path=",
    metas: {
      title: "messages.inc.php",
      description: "messages.inc.php",
    },
    content: "includes/messages.inc.php?include_path= messages.inc.php",
  },
  {
    url: "/contact.php?AD_BODY_TEMP=",
    metas: {
      title: "Not+required+for+reporting+a+file",
      description: "Not+required+for+reporting+a+file",
    },
    content: "contact.php?AD_BODY_TEMP= Not+required+for+reporting+a+file",
  },
  {
    url: "/includes/db_connect.php?baseDir=",
    metas: { title: "dotProject", description: "dotProject" },
    content: "includes/db_connect.php?baseDir= dotProject",
  },
  {
    url: "/modules/Forums/admin/admin_db_utilities.php?phpbb_root_path=",
    metas: {
      title: "/modules/Forums/",
      description: "/modules/Forums/",
    },
    content:
      "/modules/Forums/admin/admin_db_utilities.php?phpbb_root_path= /modules/Forums/",
  },
  {
    url: "/contenido/classes/class.inuse.php?cfg[path][contenido]=",
    metas: { title: "Contenido", description: "Contenido" },
    content:
      "contenido/classes/class.inuse.php?cfg[path][contenido]= Contenido",
  },
  {
    url: "/includes/db_connect.php?baseDir=",
    metas: { title: "dotProject", description: "dotProject" },
    content: "includes/db_connect.php?baseDir= dotProject",
  },
  {
    url: "/index.php?lg=",
    metas: { title: "index.php?lg=", description: "index.php?lg=" },
    content: "index.php?lg= index.php?lg=",
  },
  {
    url: "/skin/zero_vote/ask_password.php?dir=",
    metas: { title: "zeroboard", description: "zeroboard" },
    content: "skin/zero_vote/ask_password.php?dir= zeroboard",
  },
  {
    url: "/admin.php?include_path=",
    metas: { title: "Total", description: "Total" },
    content: "admin.php?include_path= Total",
  },
  {
    url: "/index2.php?_REQUEST=&_REQUEST[option]=com_content&_REQUEST[Itemid]=1&GLOBALS=&mosConfig_absolute_path=",
    metas: { title: "mambo", description: "mambo" },
    content:
      "index2.php?_REQUEST=&_REQUEST[option]=com_content&_REQUEST[Itemid]=1&GLOBALS=&mosConfig_absolute_path= mambo",
  },
  {
    url: "/components/com_pollxt/conf.pollxt.php?mosConfig_absolute_path=",
    metas: { title: "com_pollxt", description: "com_pollxt" },
    content:
      "components/com_pollxt/conf.pollxt.php?mosConfig_absolute_path= com_pollxt",
  },
  {
    url: "/administrator/components/com_colophon/admin.colophon.php?mosConfig_absolute_path=",
    metas: { title: "com_colophon", description: "com_colophon" },
    content:
      "administrator/components/com_colophon/admin.colophon.php?mosConfig_absolute_path= com_colophon",
  },
  {
    url: "/components/com_loudmounth/includes/abbc/abbc.class.php?mosConfig_absolute_path=",
    metas: {
      title: "com_loudmounth",
      description: "com_loudmounth",
    },
    content:
      "components/com_loudmounth/includes/abbc/abbc.class.php?mosConfig_absolute_path= com_loudmounth",
  },
  {
    url: "/components/com_videodb/core/videodb.class.xml.php?mosConfig_absolute_path=",
    metas: { title: "com_videodb", description: "com_videodb" },
    content:
      "components/com_videodb/core/videodb.class.xml.php?mosConfig_absolute_path= com_videodb",
  },
  {
    url: "/components/com_cloner/cloner.php?mosConfig_absolute_path=",
    metas: { title: "joomla", description: "joomla" },
    content: "components/com_cloner/cloner.php?mosConfig_absolute_path= joomla",
  },
  {
    url: "/administrator/components/com_multibanners/extadminmenus.class.php?mosConfig_absolute_path=",
    metas: {
      title: "com_multibanners",
      description: "com_multibanners",
    },
    content:
      "administrator/components/com_multibanners/extadminmenus.class.php?mosConfig_absolute_path= com_multibanners",
  },
  {
    url: "/administrator/components/com_a6mambohelpdesk/admin.a6mambohelpdesk.php?mosConfig_live_site=",
    metas: {
      title: "com_a6mambohelpdesk",
      description: "com_a6mambohelpdesk",
    },
    content:
      "administrator/components/com_a6mambohelpdesk/admin.a6mambohelpdesk.php?mosConfig_live_site= com_a6mambohelpdesk",
  },
  {
    url: "/components/com_mambatstaff/mambatstaff.php?mosConfig_absolute_path=",
    metas: {
      title: "com_mambatstaff",
      description: "com_mambatstaff",
    },
    content:
      "components/com_mambatstaff/mambatstaff.php?mosConfig_absolute_path= com_mambatstaff",
  },
  {
    url: "/components/com_securityimages/configinsert.php?mosConfig_absolute_path=",
    metas: {
      title: "com_securityimages",
      description: "com_securityimages",
    },
    content:
      "components/com_securityimages/configinsert.php?mosConfig_absolute_path= com_securityimages",
  },
  {
    url: "/components/com_securityimages/lang.php?mosConfig_absolute_path=",
    metas: {
      title: "com_securityimages",
      description: "com_securityimages",
    },
    content:
      "components/com_securityimages/lang.php?mosConfig_absolute_path= com_securityimages",
  },
  {
    url: "/components/com_artlinks/artlinks.dispnew.php?mosConfig_absolute_path=",
    metas: { title: "com_artlinks", description: "com_artlinks" },
    content:
      "components/com_artlinks/artlinks.dispnew.php?mosConfig_absolute_path= com_artlinks",
  },
  {
    url: "/components/com_galleria/galleria.html.php?mosConfig_absolute_path=",
    metas: { title: "com_galleria", description: "com_galleria" },
    content:
      "components/com_galleria/galleria.html.php?mosConfig_absolute_path= com_galleria",
  },
  {
    url: "/administrator/components/com_mgm/help.mgm.php?mosConfig_absolute_path=",
    metas: { title: "com_mgm", description: "com_mgm" },
    content:
      "administrator/components/com_mgm/help.mgm.php?mosConfig_absolute_path= com_mgm",
  },
  {
    url: "/components/com_mambatstaff/mambatstaff.php?mosConfig_absolute_path=",
    metas: {
      title: "com_mambatstaff",
      description: "com_mambatstaff",
    },
    content:
      "components/com_mambatstaff/mambatstaff.php?mosConfig_absolute_path= com_mambatstaff",
  },
  {
    url: "/redaxo/include/addons/import_export/pages/index.inc.php?REX[INCLUDE_PATH]=",
    metas: { title: "redaxo", description: "redaxo" },
    content:
      "redaxo/include/addons/import_export/pages/index.inc.php?REX[INCLUDE_PATH]= redaxo",
  },
  {
    url: "/admin.php?include_path=",
    metas: { title: "Advanced", description: "Advanced" },
    content: "admin.php?include_path= Advanced",
  },
  {
    url: "/template.php?page=",
    metas: { title: "phpBB", description: "phpBB" },
    content: "template.php?page= phpBB",
  },
  {
    url: "/phpBB2/admin/admin_cash.php?setmodules=1&phpbb_root_path=",
    metas: { title: "phpBB", description: "phpBB" },
    content: "phpBB2/admin/admin_cash.php?setmodules=1&phpbb_root_path= phpBB",
  },
  {
    url: "/forum/admin/admin_cash.php?setmodules=1&phpbb_root_path=",
    metas: { title: "phpBB", description: "phpBB" },
    content: "forum/admin/admin_cash.php?setmodules=1&phpbb_root_path= phpBB",
  },
  {
    url: "/mods/iai/includes/constants.php?phpbb_root_path=",
    metas: { title: "phpBB", description: "phpBB" },
    content: "mods/iai/includes/constants.php?phpbb_root_path= phpBB",
  },
  {
    url: "/phpBB2-MODificat/includes/functions.php?phpbb_root_path=",
    metas: { title: "PHPBB2", description: "PHPBB2" },
    content: "phpBB2-MODificat/includes/functions.php?phpbb_root_path= PHPBB2",
  },
  {
    url: "/includes/bbcb_mg.php?phpbb_root_path=",
    metas: { title: "phpBBXS", description: "phpBBXS" },
    content: "includes/bbcb_mg.php?phpbb_root_path= phpBBXS",
  },
  {
    url: "/includes/archive/archive_topic.php?phpbb_root_path=",
    metas: { title: "phpbbXtra", description: "phpbbXtra" },
    content: "includes/archive/archive_topic.php?phpbb_root_path= phpbbXtra",
  },
  {
    url: "/modules.php?op=modload&name=Wiki&file=index&pagename=",
    metas: { title: "PHP-Wiki", description: "PHP-Wiki" },
    content: "modules.php?op=modload&name=Wiki&file=index&pagename= PHP-Wiki",
  },
  {
    url: "/includes/setup.php?phpc_root_path=",
    metas: { title: "PHP-Calendar", description: "PHP-Calendar" },
    content: "includes/setup.php?phpc_root_path= PHP-Calendar",
  },
  {
    url: "/templates/default/tpl_message.php?right_file=",
    metas: { title: "PHP", description: "PHP" },
    content: "templates/default/tpl_message.php?right_file= PHP",
  },
  {
    url: "/config.php?fullpath=",
    metas: { title: "PHP", description: "PHP" },
    content: "config.php?fullpath= PHP",
  },
  {
    url: "/auction/email_request.php?user_id=",
    metas: { title: "PHP", description: "PHP" },
    content: "auction/email_request.php?user_id= PHP",
  },
  {
    url: "/modules/projects/index.php?full_path=",
    metas: { title: "PHP", description: "PHP" },
    content: "modules/projects/index.php?full_path= PHP",
  },
  {
    url: "/xarg_corner.php?xarg=",
    metas: { title: "PHP", description: "PHP" },
    content: "xarg_corner.php?xarg= PHP",
  },
  {
    url: "/screen.php?neurl=",
    metas: { title: "News", description: "News" },
    content: "screen.php?neurl= News",
  },
  {
    url: "/_theme/breadcrumb.php?rootBase=",
    metas: { title: "new", description: "new" },
    content: "/_theme/breadcrumb.php?rootBase= new",
  },
  {
    url: "/show.php?file=",
    metas: { title: "Helplink", description: "Helplink" },
    content: "show.php?file= Helplink",
  },
  {
    url: "/form.php?floap=modfich&do=",
    metas: { title: "GenesisTrader", description: "GenesisTrader" },
    content: "form.php?floap=modfich&do= GenesisTrader",
  },
  {
    url: "/inc/pipe.php?HCL_path=",
    metas: { title: "Help", description: "Help" },
    content: "inc/pipe.php?HCL_path= Help",
  },
  {
    url: "/admin/business_inc/saveserver.php?thisdir=",
    metas: { title: "confixx", description: "confixx" },
    content: "admin/business_inc/saveserver.php?thisdir= confixx",
  },
  {
    url: "/modules/Forums/favorites.php?nuke_bb_root_path=",
    metas: { title: "Powered", description: "Powered" },
    content: "modules/Forums/favorites.php?nuke_bb_root_path= Powered",
  },
  {
    url: "/manager/index.php=",
    metas: { title: "Etomite", description: "Etomite" },
    content: "/manager/index.php= Etomite",
  },
  {
    url: "/index.php?basePath=",
    metas: { title: "gizzar", description: "gizzar" },
    content: "/index.php?basePath= gizzar",
  },
  {
    url: "/Index.php?abs_url=",
    metas: { title: "PEGames", description: "PEGames" },
    content: "/Index.php?abs_url= PEGames",
  },
  {
    url: "/index.php?page=",
    metas: { title: "3editor", description: "3editor" },
    content: "/index.php?page= 3editor",
  },
  {
    url: "/index.php?AML_opensite=",
    metas: { title: "AllMyLinks", description: "AllMyLinks" },
    content: "/index.php?AML_opensite= AllMyLinks",
  },
  {
    url: "/index.php?AMV_openconfig=1&AMV_serverpath=",
    metas: { title: "AllMyVisitors", description: "AllMyVisitors" },
    content: "/index.php?AMV_openconfig=1&AMV_serverpath= AllMyVisitors",
  },
  {
    url: "/lang/index.php?file=",
    metas: { title: "oreon", description: "oreon" },
    content: "/lang/index.php?file= oreon",
  },
  {
    url: "/index.php?gen=",
    metas: { title: "mafia-2-0-0?", description: "mafia-2-0-0?" },
    content: "/index.php?gen= mafia-2-0-0?",
  },
  {
    url: "/index.php?catid=",
    metas: { title: "CascadianFAQ", description: "CascadianFAQ" },
    content: "/index.php?catid= CascadianFAQ",
  },
  {
    url: "/index.php?rootpath=",
    metas: { title: "DreamStats", description: "DreamStats" },
    content: "/index.php?rootpath= DreamStats",
  },
  {
    url: "/index.php?n=",
    metas: { title: "Jupiter", description: "Jupiter" },
    content: "/index.php?n= Jupiter",
  },
  {
    url: "/index.php?option=news&aktion=komm&ID=",
    metas: { title: "HC", description: "HC" },
    content: "/index.php?option=news&aktion=komm&ID= HC",
  },
  {
    url: "/index.php?function=custom&custom=",
    metas: { title: "Shopping", description: "Shopping" },
    content: "/index.php?function=custom&custom= Shopping",
  },
  {
    url: "/admin/index.php?p=",
    metas: { title: "iPrimal", description: "iPrimal" },
    content: "/admin/index.php?p= iPrimal",
  },
  {
    url: "/classes/index.php?siteconf=",
    metas: { title: "Lithium", description: "Lithium" },
    content: "/classes/index.php?siteconf= Lithium",
  },
  {
    url: "/Cookie/index.php=",
    metas: { title: "Imageview", description: "Imageview" },
    content: "/Cookie/index.php= Imageview",
  },
  {
    url: "/index.php=",
    metas: { title: "Berty", description: "Berty" },
    content: "/index.php= Berty",
  },
  {
    url: "/index.php?section=",
    metas: { title: "Jasmine-Web", description: "Jasmine-Web" },
    content: "/index.php?section= Jasmine-Web",
  },
  {
    url: "/index.php?contentSpecial=",
    metas: { title: "eboli", description: "eboli" },
    content: "/index.php?contentSpecial= eboli",
  },
  {
    url: "/templates/tmpl_dfl/scripts/index.php?dir[inc]=",
    metas: { title: "Boonex", description: "Boonex" },
    content: "/templates/tmpl_dfl/scripts/index.php?dir[inc]= Boonex",
  },
  {
    url: "/index.php?page=",
    metas: { title: "tagit2b", description: "tagit2b" },
    content: "/index.php?page= tagit2b",
  },
  {
    url: "/index.php?catid=",
    metas: { title: "PHP", description: "PHP" },
    content: "/index.php?catid= PHP",
  },
  {
    url: "/search.php?catid_search=",
    metas: { title: "PHP", description: "PHP" },
    content: "/search.php?catid_search= PHP",
  },
  {
    url: "/p/search.php?catid_search=",
    metas: { title: "PHP", description: "PHP" },
    content: "/p/search.php?catid_search= PHP",
  },
  {
    url: "/index.php?file_name[]=",
    metas: { title: "PowerPortal", description: "PowerPortal" },
    content: "/index.php?file_name[]= PowerPortal",
  },
  {
    url: "/admin/index.php?o=",
    metas: { title: "BrudaGB", description: "BrudaGB" },
    content: "/admin/index.php?o= BrudaGB",
  },
  {
    url: "/index.php?gr_1_id=",
    metas: { title: "Eskolar", description: "Eskolar" },
    content: "/index.php?gr_1_id= Eskolar",
  },
  {
    url: "/boitenews4/index.php?url_index=",
    metas: { title: "Boite", description: "Boite" },
    content: "/boitenews4/index.php?url_index= Boite",
  },
  {
    url: "/index.php?news_include_path=",
    metas: { title: "newsReporter", description: "newsReporter" },
    content: "/index.php?news_include_path= newsReporter",
  },
  {
    url: "/index.php?page=",
    metas: { title: "ClanSys", description: "ClanSys" },
    content: "/index.php?page= ClanSys",
  },
  {
    url: "/index.php?mod=sondages&do=",
    metas: { title: "PwsPHP", description: "PwsPHP" },
    content: "/index.php?mod=sondages&do= PwsPHP",
  },
  {
    url: "/appserv/main.php?appserv_root=",
    metas: { title: "appserv", description: "appserv" },
    content: "/appserv/main.php?appserv_root= appserv",
  },
  {
    url: "/solpot.html?body=",
    metas: { title: "all", description: "all" },
    content: "solpot.html?body= all",
  },
  {
    url: "/config.php?xcart_dir=",
    metas: { title: "X-CART", description: "X-CART" },
    content: "/config.php?xcart_dir= X-CART",
  },
  {
    url: "/ws/login.php?includedir=",
    metas: { title: "WebCalendar", description: "WebCalendar" },
    content: "/ws/login.php?includedir= WebCalendar",
  },
  {
    url: "/ocp-103/index.php?req_path=",
    metas: { title: "ocPortal", description: "ocPortal" },
    content: "ocp-103/index.php?req_path= ocPortal",
  },
  {
    url: "/images/evil.php?owned=",
    metas: { title: "e107", description: "e107" },
    content: "images/evil.php?owned= e107",
  },
  {
    url: "/index.php?module=PostWrap&page=",
    metas: { title: "PostNuke", description: "PostNuke" },
    content: "index.php?module=PostWrap&page= PostNuke",
  },
  {
    url: "/mcNews/admin/header.php?skinfile=",
    metas: { title: "mcNews", description: "mcNews" },
    content: "mcNews/admin/header.php?skinfile= mcNews",
  },
  {
    url: "/inc/download_center_lite.inc.php?script_root=",
    metas: { title: "Download", description: "Download" },
    content: "inc/download_center_lite.inc.php?script_root= Download",
  },
  {
    url: "/zboard/zboard.php?id=",
    metas: { title: "Zeroboard", description: "Zeroboard" },
    content: "zboard/zboard.php?id= Zeroboard",
  },
  {
    url: "/index.php?node=system&op=extop&ext=statman&eop=/visitor&ip=",
    metas: { title: "Nodez", description: "Nodez" },
    content:
      "index.php?node=system&op=extop&ext=statman&eop=/visitor&ip= Nodez",
  },
  {
    url: "/include/SQuery/gameSpy2.php?libpath=",
    metas: { title: "Autonomous", description: "Autonomous" },
    content: "include/SQuery/gameSpy2.php?libpath= Autonomous",
  },
  {
    url: "/event.php?myevent_path=",
    metas: { title: "MyEvent", description: "MyEvent" },
    content: "event.php?myevent_path= MyEvent",
  },
  {
    url: "/index.php?page=",
    metas: { title: "Internet", description: "Internet" },
    content: "index.php?page= Internet",
  },
  {
    url: "/mod/authent.php4?rootpath=",
    metas: {
      title: "RechnungsZentrale",
      description: "RechnungsZentrale",
    },
    content: "mod/authent.php4?rootpath= RechnungsZentrale",
  },
  {
    url: "/about.php?DFORUM_PATH=",
    metas: { title: "dForum", description: "dForum" },
    content: "about.php?DFORUM_PATH= dForum",
  },
  {
    url: "/post.php?DFORUM_PATH=",
    metas: { title: "dForum", description: "dForum" },
    content: "post.php?DFORUM_PATH= dForum",
  },
  {
    url: "/movie_cls.php?full_path=",
    metas: { title: "Built2Go", description: "Built2Go" },
    content: "movie_cls.php?full_path= Built2Go",
  },
  {
    url: "/toplist.php?f=toplist_top10&phpbb_root_path=",
    metas: { title: "powered", description: "powered" },
    content: "/toplist.php?f=toplist_top10&phpbb_root_path= powered",
  },
  {
    url: "/admin/addentry.php?phpbb_root_path=",
    metas: { title: "Advanced", description: "Advanced" },
    content: "admin/addentry.php?phpbb_root_path= Advanced",
  },
  {
    url: "/master.php?root_path=",
    metas: {
      title: "/system/article/alltopics.php",
      description: "/system/article/alltopics.php",
    },
    content: "/master.php?root_path= /system/article/alltopics.php",
  },
  {
    url: "/master.php?root_path=",
    metas: {
      title: "/system/user/index.php",
      description: "/system/user/index.php",
    },
    content: "/master.php?root_path= /system/user/index.php",
  },
  {
    url: "/includes/kb_constants.php?module_root_path=",
    metas: { title: "Powered", description: "Powered" },
    content: "includes/kb_constants.php?module_root_path= Powered",
  },
  {
    url: "/classes/adodbt/sql.php?classes_dir=",
    metas: {
      title: "index2.php?option=rss",
      description: "index2.php?option=rss",
    },
    content: "/classes/adodbt/sql.php?classes_dir= index2.php?option=rss",
  },
  {
    url: "/classes/adodbt/sql.php?classes_dir=",
    metas: { title: "powered", description: "powered" },
    content: "/classes/adodbt/sql.php?classes_dir= powered",
  },
  {
    url: "/sources/join.php?FORM[url]=owned&CONFIG[captcha]=1&CONFIG[path]=",
    metas: { title: "Powered", description: "Powered" },
    content:
      "/sources/join.php?FORM[url]=owned&CONFIG[captcha]=1&CONFIG[path]= Powered",
  },
  {
    url: "/agenda.php3?rootagenda=",
    metas: { title: "Powered", description: "Powered" },
    content: "agenda.php3?rootagenda= Powered",
  },
  {
    url: "/agenda2.php3?rootagenda=",
    metas: { title: "Powered", description: "Powered" },
    content: "agenda2.php3?rootagenda= Powered",
  },
  {
    url: "/show.php?path=",
    metas: { title: "fclick.php?", description: "fclick.php?" },
    content: "show.php?path= fclick.php?",
  },
  {
    url: "/eshow.php?Config_rootdir=",
    metas: { title: "powered", description: "powered" },
    content: "eshow.php?Config_rootdir= powered",
  },
  {
    url: "/auction/auction_common.php?phpbb_root_path=",
    metas: { title: "intext:phpbb", description: "intext:phpbb" },
    content: "auction/auction_common.php?phpbb_root_path= intext:phpbb",
  },
  {
    url: "/auction/auction_common.php?phpbb_root_path=",
    metas: { title: "auction", description: "auction" },
    content: "auction/auction_common.php?phpbb_root_path= auction",
  },
  {
    url: "/visible_count_inc.php?statitpath=",
    metas: { title: "visible", description: "visible" },
    content: "visible_count_inc.php?statitpath= visible",
  },
  {
    url: "/index.php?inc_dir=",
    metas: { title: "Powered", description: "Powered" },
    content: "index.php?inc_dir= Powered",
  },
  {
    url: "/phpdig/includes/config.php?relative_script_path=",
    metas: { title: "JetBox", description: "JetBox" },
    content: "/phpdig/includes/config.php?relative_script_path= JetBox",
  },
  {
    url: "/embed/day.php?path=",
    metas: { title: "Login", description: "Login" },
    content: "embed/day.php?path= Login",
  },
  {
    url: "/includes/dbal.php?eqdkp_root_path=",
    metas: { title: "powered", description: "powered" },
    content: "includes/dbal.php?eqdkp_root_path= powered",
  },
  {
    url: "/claroline/auth/ldap/authldap.php?includePath=",
    metas: { title: "Dokeos", description: "Dokeos" },
    content: "claroline/auth/ldap/authldap.php?includePath= Dokeos",
  },
  {
    url: "/direct.php?rf=",
    metas: { title: "ActualScripts,", description: "ActualScripts," },
    content: "/direct.php?rf= ActualScripts,",
  },
  {
    url: "/config.php?returnpath=",
    metas: { title: "PHPListPro", description: "PHPListPro" },
    content: "/config.php?returnpath= PHPListPro",
  },
  {
    url: "/addsite.php?returnpath=",
    metas: { title: "PHPListPro", description: "PHPListPro" },
    content: "addsite.php?returnpath= PHPListPro",
  },
  {
    url: "/auth/auth.php?phpbb_root_path=",
    metas: { title: "phpRaid", description: "phpRaid" },
    content: "auth/auth.php?phpbb_root_path= phpRaid",
  },
  {
    url: "/auth/auth_phpbb/phpbb_root_path=",
    metas: { title: "phpRaid", description: "phpRaid" },
    content: "auth/auth_phpbb/phpbb_root_path= phpRaid",
  },
  {
    url: "/includes/pafiledb_constants.php?module_root_path=",
    metas: { title: "PafileDB", description: "PafileDB" },
    content: "includes/pafiledb_constants.php?module_root_path= PafileDB",
  },
  {
    url: "/index.php?phpbb_root_path=",
    metas: { title: "Powered", description: "Powered" },
    content: "index.php?phpbb_root_path= Powered",
  },
  {
    url: "/extras/poll/poll.php?file_newsportal=",
    metas: { title: "TR", description: "TR" },
    content: "extras/poll/poll.php?file_newsportal= TR",
  },
  {
    url: "/cart_content.php?cart_isp_root=",
    metas: {
      title: "/squirrelcart/",
      description: "/squirrelcart/",
    },
    content: "cart_content.php?cart_isp_root= /squirrelcart/",
  },
  {
    url: "/ezusermanager_pwd_forgott.php?ezUserManager_Path=",
    metas: { title: "powered", description: "powered" },
    content: "ezusermanager_pwd_forgott.php?ezUserManager_Path= powered",
  },
  {
    url: "/includes/class_template.php?quezza_root_path=",
    metas: { title: "Quezza", description: "Quezza" },
    content: "includes/class_template.php?quezza_root_path= Quezza",
  },
  {
    url: "/sources/news.php?CONFIG[main_path]=",
    metas: { title: "Powered", description: "Powered" },
    content: "sources/news.php?CONFIG[main_path]= Powered",
  },
  {
    url: "/classified_right.php?language_dir=",
    metas: { title: "phpbazar", description: "phpbazar" },
    content: "classified_right.php?language_dir= phpbazar",
  },
  {
    url: "/cron.php?ROOT_PATH=",
    metas: { title: "powered", description: "powered" },
    content: "cron.php?ROOT_PATH= powered",
  },
  {
    url: "/cron.php?ROOT_PATH=",
    metas: {
      title: "intext:2001-2006",
      description: "intext:2001-2006",
    },
    content: "cron.php?ROOT_PATH= intext:2001-2006",
  },
  {
    url: "/reconfig.php?GLOBALS[CLPath]=",
    metas: { title: "CaLogic", description: "CaLogic" },
    content: "reconfig.php?GLOBALS[CLPath]= CaLogic",
  },
  {
    url: "/srxclr.php?GLOBALS[CLPath]=",
    metas: { title: "CaLogic", description: "CaLogic" },
    content: "srxclr.php?GLOBALS[CLPath]= CaLogic",
  },
  {
    url: "/sources/post.php?fil_config=",
    metas: { title: "Fusion", description: "Fusion" },
    content: "sources/post.php?fil_config= Fusion",
  },
  {
    url: "/BE_config.php?_PSL[classdir]=",
    metas: { title: "Back-End", description: "Back-End" },
    content: "BE_config.php?_PSL[classdir]= Back-End",
  },
  {
    url: "/index.php?site_path=",
    metas: { title: "Powered", description: "Powered" },
    content: "/index.php?site_path= Powered",
  },
  {
    url: "/vwebmail/includes/mailaccess/pop3/core.php?CONFIG[pear_dir]=",
    metas: { title: "V-Webmail", description: "V-Webmail" },
    content:
      "vwebmail/includes/mailaccess/pop3/core.php?CONFIG[pear_dir]= V-Webmail",
  },
  {
    url: "/includes/mailaccess/pop3.php?CONFIG[pear_dir]=",
    metas: { title: "V-Webmail", description: "V-Webmail" },
    content: "includes/mailaccess/pop3.php?CONFIG[pear_dir]= V-Webmail",
  },
  {
    url: "/DOCEBO205/modules/credits/help.php?lang=",
    metas: { title: "Docebo", description: "Docebo" },
    content: "DOCEBO205/modules/credits/help.php?lang= Docebo",
  },
  {
    url: "/cached.php3?GLOBALS[AA_INC_PATH]=",
    metas: { title: "APC", description: "APC" },
    content: "cached.php3?GLOBALS[AA_INC_PATH]= APC",
  },
  {
    url: "/jsview.php3?GLOBALS[AA_INC_PATH]=",
    metas: { title: "APC", description: "APC" },
    content: "jsview.php3?GLOBALS[AA_INC_PATH]= APC",
  },
  {
    url: "/auth.php3?GLOBALS[AA_INC_PATH]=",
    metas: { title: "APC", description: "APC" },
    content: "auth.php3?GLOBALS[AA_INC_PATH]= APC",
  },
  {
    url: "/manager/frontinc/prepend.php?_PX_config[manager_path]=",
    metas: { title: "Plume", description: "Plume" },
    content: "manager/frontinc/prepend.php?_PX_config[manager_path]= Plume",
  },
  {
    url: "/admin/lib_action_step.php?GLOBALS[CLASS_PATH]=",
    metas: { title: "Hot", description: "Hot" },
    content: "admin/lib_action_step.php?GLOBALS[CLASS_PATH]= Hot",
  },
  {
    url: "/p-popupgallery.php?l=",
    metas: { title: "F@cile", description: "F@cile" },
    content: "p-popupgallery.php?l= F@cile",
  },
  {
    url: "/ubbt.inc.php?GLOBALS[thispath]=",
    metas: { title: "UBBThreads", description: "UBBThreads" },
    content: "ubbt.inc.php?GLOBALS[thispath]= UBBThreads",
  },
  {
    url: "/ubbt.inc.php?thispath=",
    metas: { title: "UBBThreads", description: "UBBThreads" },
    content: "ubbt.inc.php?thispath= UBBThreads",
  },
  {
    url: "/language/lang_english/lang_activity.php?phpbb_root_path=",
    metas: { title: "Activity", description: "Activity" },
    content:
      "language/lang_english/lang_activity.php?phpbb_root_path= Activity",
  },
  {
    url: "/blend_data/blend_common.php?phpbb_root_path=",
    metas: { title: "Blend", description: "Blend" },
    content: "blend_data/blend_common.php?phpbb_root_path= Blend",
  },
  {
    url: "/suche/search.php?config[fsBase]=",
    metas: { title: "Fastpublish", description: "Fastpublish" },
    content: "suche/search.php?config[fsBase]= Fastpublish",
  },
  {
    url: "/drucken.php?config[fsBase]=",
    metas: { title: "Fastpublish", description: "Fastpublish" },
    content: "drucken.php?config[fsBase]= Fastpublish",
  },
  {
    url: "/includes/common.php?root_path=",
    metas: { title: "gnopaste", description: "gnopaste" },
    content: "includes/common.php?root_path= gnopaste",
  },
  {
    url: "/error.php?default_path=",
    metas: { title: "Ottoman", description: "Ottoman" },
    content: "error.php?default_path= Ottoman",
  },
  {
    url: "/app/edocument/edocument_basic_view_menu.php?system_path=",
    metas: { title: "metajour", description: "metajour" },
    content:
      "app/edocument/edocument_basic_view_menu.php?system_path= metajour",
  },
  {
    url: "/app/eproject/eproject_basic_view_menu.php?system_path=",
    metas: { title: "metajour", description: "metajour" },
    content: "app/eproject/eproject_basic_view_menu.php?system_path= metajour",
  },
  {
    url: "/app/erek/erek_basic_view_menu.php?system_path=",
    metas: { title: "metajour", description: "metajour" },
    content: "app/erek/erek_basic_view_menu.php?system_path= metajour",
  },
  {
    url: "/extension/article/article.class.php?system_path=",
    metas: { title: "metajour", description: "metajour" },
    content: "extension/article/article.class.php?system_path= metajour",
  },
  {
    url: "/extension/search/search.class.php?system_path=",
    metas: { title: "metajour", description: "metajour" },
    content: "extension/search/search.class.php?system_path= metajour",
  },
  {
    url: "/admin/menu.php?root_path=",
    metas: { title: "AssoCIateD", description: "AssoCIateD" },
    content: "admin/menu.php?root_path= AssoCIateD",
  },
  {
    url: "/includes/webdav/server.php?bhconfig[bhfilepath]=",
    metas: { title: "Bytehoard", description: "Bytehoard" },
    content: "includes/webdav/server.php?bhconfig[bhfilepath]= Bytehoard",
  },
  {
    url: "/include/addons/image_resize/pages/index.inc.php?REX[INCLUDE_PATH]=",
    metas: { title: "Redaxo", description: "Redaxo" },
    content:
      "include/addons/image_resize/pages/index.inc.php?REX[INCLUDE_PATH]= Redaxo",
  },
  {
    url: "/class/Wiki/Wiki.php?c_node[class_path]=",
    metas: { title: "Igloo", description: "Igloo" },
    content: "class/Wiki/Wiki.php?c_node[class_path]= Igloo",
  },
  {
    url: "/ashheadlines.php?pathtoashnews=",
    metas: { title: "powered", description: "powered" },
    content: "ashheadlines.php?pathtoashnews= powered",
  },
  {
    url: "/ashnews.php?pathtoashnews=",
    metas: { title: "powered", description: "powered" },
    content: "ashnews.php?pathtoashnews= powered",
  },
  {
    url: "/admin/common-menu.php?CONF[local_path]=",
    metas: { title: "Informium", description: "Informium" },
    content: "admin/common-menu.php?CONF[local_path]= Informium",
  },
  {
    url: "/modules/Forums/admin/index.php?phpbb_root_path=",
    metas: { title: "PHP-Nuke", description: "PHP-Nuke" },
    content: "modules/Forums/admin/index.php?phpbb_root_path= PHP-Nuke",
  },
  {
    url: "/modules/Forums/admin/admin_words.php?phpbb_root_path=",
    metas: { title: "PHP-Nuke", description: "PHP-Nuke" },
    content: "modules/Forums/admin/admin_words.php?phpbb_root_path= PHP-Nuke",
  },
  {
    url: "/modules/Forums/admin/admin_smilies.php?phpbb_root_path=",
    metas: { title: "PHP-Nuke", description: "PHP-Nuke" },
    content: "modules/Forums/admin/admin_smilies.php?phpbb_root_path= PHP-Nuke",
  },
  {
    url: "/modules/Forums/admin/admin_users.php?phpbb_root_path=",
    metas: { title: "PHP-Nuke", description: "PHP-Nuke" },
    content: "modules/Forums/admin/admin_users.php?phpbb_root_path= PHP-Nuke",
  },
  {
    url: "/applications/faq/Bs_Faq.class.php?APP[path][applications]=",
    metas: { title: "BlueShoes", description: "BlueShoes" },
    content:
      "applications/faq/Bs_Faq.class.php?APP[path][applications]= BlueShoes",
  },
  {
    url: "/applications/filemanager/file.php?APP[path][core]=",
    metas: { title: "BlueShoes", description: "BlueShoes" },
    content: "applications/filemanager/file.php?APP[path][core]= BlueShoes",
  },
  {
    url: "/inc/logincheck.inc.php?path=",
    metas: {
      title: "Webspotblogging",
      description: "Webspotblogging",
    },
    content: "inc/logincheck.inc.php?path= Webspotblogging",
  },
  {
    url: "/inc/global.php?path=",
    metas: {
      title: "Webspotblogging",
      description: "Webspotblogging",
    },
    content: "inc/global.php?path= Webspotblogging",
  },
  {
    url: "/classes/phpmailer/class.cs_phpmailer.php?classes_dir=",
    metas: { title: "Powered", description: "Powered" },
    content: "classes/phpmailer/class.cs_phpmailer.php?classes_dir= Powered",
  },
  {
    url: "/index.php?file_path=",
    metas: { title: "dotwidget", description: "dotwidget" },
    content: "/index.php?file_path= dotwidget",
  },
  {
    url: "/includes/common.inc?file_path=",
    metas: { title: "dotwidget", description: "dotwidget" },
    content: "/includes/common.inc?file_path= dotwidget",
  },
  {
    url: "/auth.cookie.inc.php?da_path=",
    metas: { title: "powered", description: "powered" },
    content: "/auth.cookie.inc.php?da_path= powered",
  },
  {
    url: "/auth.header.inc.php?da_path=",
    metas: { title: "powered", description: "powered" },
    content: "/auth.header.inc.php?da_path= powered",
  },
  {
    url: "/_wk/wk_lang.php?WK[wkPath]=",
    metas: { title: "Wikiwig", description: "Wikiwig" },
    content: "_wk/wk_lang.php?WK[wkPath]= Wikiwig",
  },
  {
    url: "/contrib/forms/evaluation/C_FormEvaluation.class.php?GLOBALS[fileroot]=",
    metas: { title: "OpenEMR", description: "OpenEMR" },
    content:
      "contrib/forms/evaluation/C_FormEvaluation.class.php?GLOBALS[fileroot]= OpenEMR",
  },
  {
    url: "/sources/post.php?fil_config=",
    metas: { title: "Xtreme/Ditto", description: "Xtreme/Ditto" },
    content: "sources/post.php?fil_config= Xtreme/Ditto",
  },
  {
    url: "/class/jpcache/jpcache.php?_PSL[classdir]=",
    metas: { title: "Back-end", description: "Back-end" },
    content: "class/jpcache/jpcache.php?_PSL[classdir]= Back-end",
  },
  {
    url: "/dialogs/td.php?spaw_root=",
    metas: { title: "cms-bandits", description: "cms-bandits" },
    content: "dialogs/td.php?spaw_root= cms-bandits",
  },
  {
    url: "/dialogs/img.php?spaw_root=",
    metas: { title: "cms-bandits", description: "cms-bandits" },
    content: "dialogs/img.php?spaw_root= cms-bandits",
  },
  {
    url: "/footer.php?absolutepath=",
    metas: { title: "Enterprise", description: "Enterprise" },
    content: "footer.php?absolutepath= Enterprise",
  },
  {
    url: "/admin/footer.php?absolutepath=",
    metas: { title: "Enterprise", description: "Enterprise" },
    content: "admin/footer.php?absolutepath= Enterprise",
  },
  {
    url: "/phpcodecabinet_directory/include/Beautifier/Core.php?BEAUT_PATH=",
    metas: {
      title: "PHPCodeCabinet",
      description: "PHPCodeCabinet",
    },
    content:
      "phpcodecabinet_directory/include/Beautifier/Core.php?BEAUT_PATH= PHPCodeCabinet",
  },
  {
    url: "/calendar.php?cfg_dir=",
    metas: { title: "Visual", description: "Visual" },
    content: "calendar.php?cfg_dir= Visual",
  },
  {
    url: "/includes/usercp_register.php?phpbb_root_path=",
    metas: { title: "ZoneX", description: "ZoneX" },
    content: "includes/usercp_register.php?phpbb_root_path= ZoneX",
  },
  {
    url: "/lib/auth.inc.php?INIT_PATH=",
    metas: { title: "phNNTP", description: "phNNTP" },
    content: "lib/auth.inc.php?INIT_PATH= phNNTP",
  },
  {
    url: "/genpage-cgi.php?REP_INC=",
    metas: { title: "Cwfm-0.9.1", description: "Cwfm-0.9.1" },
    content: "genpage-cgi.php?REP_INC= Cwfm-0.9.1",
  },
  {
    url: "/boitenews4/index.php?url_index=",
    metas: { title: "Boite", description: "Boite" },
    content: "boitenews4/index.php?url_index= Boite",
  },
  {
    url: "/owimg.php3?path=",
    metas: { title: "See-Commerce", description: "See-Commerce" },
    content: "owimg.php3?path= See-Commerce",
  },
  {
    url: "/examples/image.php?image=",
    metas: { title: "powered", description: "powered" },
    content: "examples/image.php?image= powered",
  },
  {
    url: "/examples/examples/image.php2?image=",
    metas: { title: "powered", description: "powered" },
    content: "examples/examples/image.php2?image= powered",
  },
  {
    url: "/include/inc_ext/spaw/dialogs/table.php?spaw_root=",
    metas: {
      title: "phpwcms/index.php?id=",
      description: "phpwcms/index.php?id=",
    },
    content:
      "include/inc_ext/spaw/dialogs/table.php?spaw_root= phpwcms/index.php?id=",
  },
  {
    url: "/src/Login.php?page=",
    metas: { title: "Spaminator", description: "Spaminator" },
    content: "src/Login.php?page= Spaminator",
  },
  {
    url: "/index.php?page=",
    metas: { title: "SaveWebPortal", description: "SaveWebPortal" },
    content: "index.php?page= SaveWebPortal",
  },
  {
    url: "/inc/header.inc.php?ficStyle=",
    metas: {
      title: "phpPrintAnalyzer",
      description: "phpPrintAnalyzer",
    },
    content: "inc/header.inc.php?ficStyle= phpPrintAnalyzer",
  },
  {
    url: "/Classes/Event_for_month.php?_BASE=",
    metas: { title: "Chaussette", description: "Chaussette" },
    content: "Classes/Event_for_month.php?_BASE= Chaussette",
  },
  {
    url: "/install/install3.php?database=none&cabsolute_path=",
    metas: { title: "WEBInsta", description: "WEBInsta" },
    content: "install/install3.php?database=none&cabsolute_path= WEBInsta",
  },
  {
    url: "/BaseLoader.php?glConf[path_libraries]=",
    metas: { title: "MVCnPHP", description: "MVCnPHP" },
    content: "BaseLoader.php?glConf[path_libraries]= MVCnPHP",
  },
  {
    url: "/includes/session.php?wb_class_dir=",
    metas: { title: "Wheatblog", description: "Wheatblog" },
    content: "includes/session.php?wb_class_dir= Wheatblog",
  },
  {
    url: "/index.php?templates_dir=",
    metas: { title: "WEBinsta", description: "WEBinsta" },
    content: "index.php?templates_dir= WEBinsta",
  },
  {
    url: "/common.php?rootdir=",
    metas: { title: "projectbutler", description: "projectbutler" },
    content: "common.php?rootdir= projectbutler",
  },
  {
    url: "/inc/indexhead.php?fileloc=",
    metas: { title: "discloser", description: "discloser" },
    content: "inc/indexhead.php?fileloc= discloser",
  },
  {
    url: "/modules/usersonline/users.php?module_dir=",
    metas: { title: "WEBinsta", description: "WEBinsta" },
    content: "modules/usersonline/users.php?module_dir= WEBinsta",
  },
  {
    url: "/lib/specialdays.php?path_pre=",
    metas: { title: "PHProjekt", description: "PHProjekt" },
    content: "lib/specialdays.php?path_pre= PHProjekt",
  },
  {
    url: "/lib/dbman_filter.inc.php?lib_path=",
    metas: { title: "PHProjekt", description: "PHProjekt" },
    content: "lib/dbman_filter.inc.php?lib_path= PHProjekt",
  },
  {
    url: "/classes/query.class.php?baseDir=",
    metas: { title: "dotProject", description: "dotProject" },
    content: "classes/query.class.php?baseDir= dotProject",
  },
  {
    url: "/include/urights.php?CRM_inc=",
    metas: { title: "Outreach", description: "Outreach" },
    content: "include/urights.php?CRM_inc= Outreach",
  },
  {
    url: "/system/includes/pageheaderdefault.inc.php?_sysSessionPath=",
    metas: { title: "Invisionix", description: "Invisionix" },
    content:
      "system/includes/pageheaderdefault.inc.php?_sysSessionPath= Invisionix",
  },
  {
    url: "/s03.php?shopid=",
    metas: { title: "powergap", description: "powergap" },
    content: "s03.php?shopid= powergap",
  },
  {
    url: "/administrator/components/com_mtree/Savant2/Savant2_Plugin_textarea.php?mosConfig_absolute_path=",
    metas: { title: "/com_mtree/", description: "/com_mtree/" },
    content:
      "administrator/components/com_mtree/Savant2/Savant2_Plugin_textarea.php?mosConfig_absolute_path= /com_mtree/",
  },
  {
    url: "/administrator/components/com_a6mambocredits/admin.a6mambocredits.php?mosConfig_live_site=",
    metas: {
      title: "com_a6mambocredits",
      description: "com_a6mambocredits",
    },
    content:
      "administrator/components/com_a6mambocredits/admin.a6mambocredits.php?mosConfig_live_site= com_a6mambocredits",
  },
  {
    url: "/handlers/email/mod.listmail.php?_PM_[path][handler]=",
    metas: { title: "PHlyMail", description: "PHlyMail" },
    content: "handlers/email/mod.listmail.php?_PM_[path][handler]= PHlyMail",
  },
  {
    url: "/app/common/lib/codeBeautifier/Beautifier/Core.php?BEAUT_PATH=",
    metas: { title: "phpCodeGenie", description: "phpCodeGenie" },
    content:
      "app/common/lib/codeBeautifier/Beautifier/Core.php?BEAUT_PATH= phpCodeGenie",
  },
  {
    url: "/administrator/components/com_kochsuite/config.kochsuite.php?mosConfig_absolute_path=",
    metas: { title: "com_kochsuite", description: "com_kochsuite" },
    content:
      "administrator/components/com_kochsuite/config.kochsuite.php?mosConfig_absolute_path= com_kochsuite",
  },
  {
    url: "/plugins/1_Adressbuch/delete.php?folder=",
    metas: { title: "Sonium", description: "Sonium" },
    content: "plugins/1_Adressbuch/delete.php?folder= Sonium",
  },
  {
    url: "/administrator/components/com_cropimage/admin.cropcanvas.php?cropimagedir=",
    metas: { title: "com_cropimage", description: "com_cropimage" },
    content:
      "administrator/components/com_cropimage/admin.cropcanvas.php?cropimagedir= com_cropimage",
  },
  {
    url: "/admin/autoprompter.php?CONFIG[BASE_PATH]=",
    metas: { title: "Cce-interact", description: "Cce-interact" },
    content: "admin/autoprompter.php?CONFIG[BASE_PATH]= Cce-interact",
  },
  {
    url: "/includes/common.inc.php?CONFIG[BASE_PATH]=",
    metas: { title: "Cce-interact", description: "Cce-interact" },
    content: "includes/common.inc.php?CONFIG[BASE_PATH]= Cce-interact",
  },
  {
    url: "/include/novalib/class.novaEdit.mysql.php?TNLIB_DIR=",
    metas: { title: "Tutti", description: "Tutti" },
    content: "include/novalib/class.novaEdit.mysql.php?TNLIB_DIR= Tutti",
  },
  {
    url: "/news.php?CONFIG[script_path]=",
    metas: { title: "Fantastic", description: "Fantastic" },
    content: "news.php?CONFIG[script_path]= Fantastic",
  },
  {
    url: "/include/yapbb_session.php?GLOBALS[includeBit]=devilteam&cfgIncludeDirectory=",
    metas: { title: "YapBB", description: "YapBB" },
    content:
      "include/yapbb_session.php?GLOBALS[includeBit]=devilteam&cfgIncludeDirectory= YapBB",
  },
  {
    url: "/local/lib/lcUser.php?LIBDIR=",
    metas: { title: "Local", description: "Local" },
    content: "local/lib/lcUser.php?LIBDIR= Local",
  },
  {
    url: "/themes/program/themesettings.inc.php?themesdir=",
    metas: { title: "Segue", description: "Segue" },
    content: "themes/program/themesettings.inc.php?themesdir= Segue",
  },
  {
    url: "/lib/rs.php?rootpath=",
    metas: { title: "CASTOR", description: "CASTOR" },
    content: "lib/rs.php?rootpath= CASTOR",
  },
];
module.exports = pages;
