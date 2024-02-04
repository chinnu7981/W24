
document.addEventListener("DOMContentLoaded", () => {
    const open = document.querySelector('.containerg');
    const close = document.querySelector('.close');
    var tl = gsap.timeline({ defaults: { duration: 1, ease: 'expo.inOut' } });
    open.addEventListener('click', () => {
        tl.to('nav.lap ul',{transform:'scale(1)'},'-=1.9')
            .to('nav.lap', { background: 'black' }, '-=1.9')
            .to('nav.lap', { width: '100vw' }, '-=1.8')
            .to('nav.lap', { height: '100vh' }, '-=0.5')
            .to('nav.lap ul li ', { display:'block' }, '+=.1')
            .to('nav.lap ul li a', { opacity: 1, pointerEvents: 'all', stagger: .2 }, '-=1.7')
            .to('.close', { opacity: 1, pointerEvents: 'all' }, "-=.1")

    });

    close.addEventListener('click', () => {
        tl
        .to('nav.lap ul li a', { opacity: 0, pointerEvents: 'all', stagger: .2 }, '-=4.1')
        .to('.close', { opacity: 0, pointerEvents: 'all' }, "=.8")
        .to('nav.lap ul li ', { display:'none' }, '-=.1')
            .to('nav.lap', { height: '30px' }, '-=2.1')
            .to('nav.lap', { width: '100vw' })
            .to('nav.lap', { background: 'transparent' }, '-=1.9')
    });
});