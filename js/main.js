// main.js

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
  
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('header nav a');
    const navHeight = header.offsetHeight;
  
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight + 2;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      });
    });
  
    // Highlight active link on scroll & toggle navbar opacity
    const sections = document.querySelectorAll('.section');
    window.addEventListener('scroll', () => {
      const scrollPos = window.pageYOffset;
      sections.forEach(section => {
        const top = section.offsetTop - navHeight;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`header nav a[href="#${id}"]`);
        if (scrollPos >= top && scrollPos <= bottom) {
          navLinks.forEach(a => a.classList.remove('active'));
          link.classList.add('active');
        }
      });
      if (scrollPos > 80) header.classList.add('bg-nav'); else header.classList.remove('bg-nav');
    });
  
    // Preloader hide on window load
    window.addEventListener('load', () => {
      const status = document.getElementById('status');
      const preloader = document.getElementById('preloader');
      status.style.opacity = '0';
      setTimeout(() => {
        preloader.style.opacity = '0';
        document.body.style.overflow = 'visible';
      }, 350);
    });
  
    // Initialize AOS animations
    AOS.init({ duration: 1200, once: true, disable: 'mobile' });
  
    // Portfolio filtering without jQuery/Isotope
    const filterLinks = document.querySelectorAll('.portfolio_filter a');
    const items = document.querySelectorAll('.portfolio_container .col-md-4');
    filterLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('.portfolio_filter .active').classList.remove('active');
        link.classList.add('active');
        const filter = link.getAttribute('data-filter').slice(1);
        items.forEach(item => {
          if (filter === '*' || item.classList.contains(filter)) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  
    // Simple modal open/close
    const modal = document.getElementById('animatedModal');
    const closeBtn = document.querySelector('.close-popup-modal');
    document.querySelectorAll('.portfolio_item').forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault();
        document.body.style.overflow = 'hidden';
        modal.classList.add('animatedModal-on');
        modal.style.visibility = 'visible';
        modal.style.opacity = '1';
      });
    });
    closeBtn.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.overflow = 'auto';
      modal.style.opacity = '0';
      setTimeout(() => {
        modal.classList.remove('animatedModal-on');
        modal.style.visibility = 'hidden';
      }, 600);
    });
  
    // Contact form submission via fetch
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (form.checkValidity()) {
        fetch('process.php', { method: 'POST', body: new FormData(form) })
          .then(res => {
            if (res.ok) {
              document.getElementById('success').style.display = 'block';
              form.querySelectorAll('input,textarea,button').forEach(el => el.disabled = true);
            } else {
              throw new Error();
            }
          })
          .catch(() => {
            document.getElementById('error').style.display = 'block';
          });
      } else {
        form.reportValidity();
      }
    });
  });
  