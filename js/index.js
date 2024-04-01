import {NavItem, Logo} from './json_data/NavItem.js';
import {Hero} from './json_data/Hero.js';
import './lib/jquery.js'
import {Speciality} from './json_data/Specialites.js';
import {About} from './json_data/About.js';
import {Award} from './json_data/Award.js';
import {Service} from './json_data/Service.js';
import {DoctorHero, Doctors} from './json_data/Doctor.js';

$(document).ready(function () {
  initLogo();
  iniNavItem();
  initHero();
  initSpeciality();
  initAboutUS();
  initAward();
  initService();
  initDoctorHero();
  initDoctorList();
});

const initLogo = () => {
  const logo = Logo();
  const main = $('.logo');
  const clone = main.clone();
  clone.find('img').attr('src', logo.img);
  clone.find('.logo_text').html(logo.name);
  main.empty();
  main.append(clone);
}
const iniNavItem = () => {
  const navs = $('#dynamic_nav');
  const html = NavItem().map((item) => {
    return `<li>
                <a href="${item.href}">${item.name}</a>
            </li>`;
  });
  navs.html(html);
}
const initHero = () => {
  const hero = $('#hero');
  const heroData = Hero();
  hero.find('.hero_content h6').html(heroData.title);
  hero.find('.hero_content h3').html(heroData.main_title);
  hero.find('.hero_content p').html(heroData.description);
  hero.find('.hero_content button.btn').html(heroData.button.title);
  hero.find('img').attr('src', heroData.img);
}
const initSpeciality = () => {
  const speciality = $('.specialities');
  const html = Speciality().map((item) => {
    return `
    <div class="speciality">
        <div class="icon">
            <img src="${item.img}" alt="Specializations">
            ${item.title}
        </div>
        <div class="description">
            ${item.description}
        </div>
    </div>
    `
  })
  speciality.html(html);
}
const initAboutUS = () => {
  const about = $('#about');
  const aboutData = About();
  about.find('.header_content').html(aboutData.title)
  about.find('.badge').html(aboutData.badge);
}
const initAward= () => {
    const award = $('.award_list');
    const awardData = Award();
    const html = awardData.map((item) => {
      const contents = item.contents.map((content) => {
        return `
        <div class="award">
                    <div class="icon">
                        <img src="${content.img}" alt="Specializations">
                        ${content.title}
                    </div>
                    <div class="description">
                        ${content.description}
                    </div>
                </div>
        `;
      });
      
      return `
        <div class="top">
         <div class="period">${item.period}</div>
         <div class="badge">${item.badge}</div>
       </div>
       <div class="awards">
       ${contents.length > 0 ? contents.join('\n') : ''}
       </div>
      `
    })
    award.html(html)
}

const initService = () => {
  const service = $('#our_service');
  const serviceData = Service();
  const html = serviceData.contents.map((content) => {
    return`
    <div class="service">
                <img src="${content.img}" alt="cardiology">
                <div class="content">
                    <h6>${content.title}</h6>
                    <p>${content.description}</p>
                    <a href="#" class="read_more">
                        Read More ->
                    </a>
                </div>
            </div>
    `
  })
  service.html(`
  <div class="top">
            <div class="period">${serviceData.period}</div>
            <div class="badge">${serviceData.badge}</div>
      </div>
      <div class="services">
      ${html.length > 0 ? html.join('\n') : ''}
      </div>
  `)
}
const initDoctorHero = () => {
  const hero = $('#doctor_hero');
  const heroData = DoctorHero();
  hero.find('.hero_content h6').html(heroData.title);
  hero.find('.hero_content h3').html(heroData.main_title);
  hero.find('.hero_content p').html(heroData.description);
}
const initDoctorList = () => {
  const list = $('.list');
  const filters = list.find('.filters');
  const doctors = Doctors();
  const htmlFilter = doctors.map((item) => {
    return `
      <label>
        <input id="filter-data" type="checkbox" data-target="${item.department}">
        ${item.department}
      </label>
    `
  })
  filters.find('.checklist').html(htmlFilter);
  filterDoctor(list.find('table'),doctors);
  reinitFilter();
}

const filterDoctor = (table,doctors) => {
  table.empty();
  const header = `
  <tr>
    <th>Name</th>
    <th>Sex</th>
    <th>Shift</th>
    <th>Department</th>
    <th>Number</th>
    <th>Availability</th>
  </tr>
  `
  const html = doctors.map((item) => {
    const anotherHtml = `
      <tr class="collapse_row">
                <td colspan="6">
                    <table>
                        <tr>
                            <th>Experience</th>
                            <th>Rating</th>
                            <th>Language</th>
                            <th>Qualifications</th>
                            <th>Email</th>
                            <th>Book now</th>
                        </tr>
                        <tr>
                            <td>${item.collapse.experience}</td>
                            <td>${item.collapse.rating}</td>
                            <td>${item.collapse.language}</td>
                            <td>${item.collapse.qualifications}</td>
                            <td>${item.collapse.email}</td>
                            <td><button>Book</button></td>
                        </tr>
                    </table>
                </td>
            </tr>
    `;
    return `
    <td>
                    <div class="avatar"></div>
                    ${item.name}
                </td>
                <td>${item.sex}</td>
                <td>${item.shift}</td>
                <td>${item.department}</td>
                <td>${item.phone}</td>
                <td>
                    <div class="badge">Available</div>
                    <div class="more" onclick="console.log('collapse')">...</div>
                </td>
                ${anotherHtml}
    `
  })
  table.html(header + html)
}
let FILTER_LIST = new Set();
const reinitFilter = () => {
  $('input[type=checkbox]').on('change', () => {
      const button = $('input[type=checkbox]');
      button.each((i, el) => {
        const target = $(el).data('target');
        if($(el).is(':checked')){
          FILTER_LIST.add(target);
        }else{
          FILTER_LIST.delete(target);
        }
      })
      
    const list = $('.list');
    const table = list.find('table');
      
      if(FILTER_LIST.size === 0){
        initDoctorList();
      }else{
        const Docs = Doctors();
        const filter = Docs.filter((item) => {
          return FILTER_LIST.has(item.department);
        })
          filterDoctor(table, filter);
      }
  });
}
