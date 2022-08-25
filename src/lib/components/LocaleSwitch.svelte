<script>
    import { _l } from '$lib/store.js';
    import { onMount } from "svelte";

    function setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        // if no coockie set
        let languages = navigator.languages;
        if(languages.includes('de') || languages.includes('de-DE')  || languages.includes('de-AT') || languages.includes('de-CH')) {
            setCookie('language', 'de', 365);
            return 'de';
        } else if(languages.includes('en') || languages.includes('en-US') || languages.includes('en-AU') || languages.includes('en-GB')) {
            setCookie('language', 'en', 365);
            return 'en';
        } else {
            return 'en';
        }
    }

    function handleLocaleChange() {
        let lang = this.value;
        _l.update(n => lang);
        setCookie('language', lang, 365);
    }

    onMount(() => {
        _l.update(n => getCookie('language'));
    })

// $: currentPath = (typeof window !== 'undefined') ? location.protocol + '//' + location.host + location.pathname : '';
</script>

<svelte:head>
    <meta http-equiv="content-language" content="{$_l}">
    <!-- <link rel="alternate" hreflang="en" href="{currentPath}?l=en">
    <link rel="alternate" hreflang="de" href="{currentPath}?l=de"> -->
</svelte:head>

<select value={$_l} on:change={handleLocaleChange} aria-label="{$_l}, Select your language" size="1">
    <option value="de">DE</option>
    <option value="en">EN</option>
</select>

<style>
    select {
  background:none;
  width:auto;
  height:auto;
  padding:0;
  margin:0;
  border-style: inset;
  -moz-appearance: menulist;
  -webkit-appearance: menulist;
  appearance: menulist;


  -moz-appearance:none;
    -moz-border-radius:1px;
    -moz-box-sizing:border-box;
    -webkit-appearance:none;
    -webkit-border-radius:1px;
    appearance:none;
    background:none;
    border:none;
    font-size:1.8em;
    height:36px;
    resize:none;
    vertical-align:baseline;
    width:260px;
    /* padding:9px 7px 9px 17px; */
}
select:focus {
    border: none;
}
option {
    display: inline-block;
    /* height:100px;
	width:100px; */
}
</style>