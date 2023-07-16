var gmtTag = process.env.GMT_TAG;

(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer',gmtTag);

             var noscript = document.createElement('noscript');
                noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gmtTag}" ` +
                                     'height="0" width="0" style="display:none;visibility:hidden"></iframe>';
                document.body.appendChild(noscript);
                function createRobotsMetaTag() {
                    var index=process.env.INDEX_TAG
                    var meta = document.createElement('meta');
                    meta.setAttribute('name', 'robots');
                    meta.setAttribute('content', `${index}index, ${index}follow`);
                    document.head.appendChild(meta);
                }
                createRobotsMetaTag()  