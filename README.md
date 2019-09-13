# Travel Template

1) Minimal adaptive size is 320px.
2) In Google Page Speed the result is different: on PC = 95 & on Mobiles = 72 . 
    -- This I'll fix by adding smaller size images, add lazy-loading for bg-images.
3) Code was validating without any problems.
...
4) Slider I realized by library Slick.js. It also requires jQuery. 
  Docs: https://kenwheeler.github.io/slick/
5) Sticky footer I realized by wrapping <header> and <section>-s to <main> tag. JS file calculates <footer> height property so it should be enabled in client's browser. I know another realization, without JS, but that is working only with adding non-semantical empty tags and fixed height for <footer>.
6) JS isn't minified;  There are libraries in another .js files, not in one.
7) You can easily move sections, but you should do it in <main> tag.
8) Form validation I created simple, with one 'error message'.
  
* Add. I added animations and waypoints - just because I added jQuery and didn't want to lose this chance.

# Optimized Template

- I use optimized template, which saves in LocalStorage font-files. It looks not pretty good at first, but it is very useful.
- Header.min.css I wrote down in <style> tag at the beginning of index.html. It is very important for making template load more faster, then usual. I could place also a structure.min.css file in <style> tag below, but I didn't.
  
# What I haven't done

!-- Lazy load I've made only for one image - because I have few tags <img> in this template, but a lot of background-images. I will realize that in seem way as I did with simple img - replacing to real-img from dummy.

!-- In mobile version of site I should put smaller images than in default size for PC. Google Page Speed decreases the rating because of it. It's easy to made, so I will have updated template
