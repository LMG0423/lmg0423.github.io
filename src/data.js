const c = (name, headline, title, employer, loc, conf, url, reason) => ({
  name, headline, title, employer, loc, conf, url, reason
})

const A = (id, name, state, aff, year, cands) => ({
  id, name, state, aff, year,
  status: 'pending',
  selected: 0,
  editTitle: cands[0].title,
  editEmployer: cands[0].employer,
  candidates: cands,
})

export const INITIAL_ALUMNI = [
  A(1,'Margaret Chen','California','College of Engineering',2014,[
    c('Margaret Chen','Senior Product Manager at Stripe','Senior Product Manager','Stripe','San Francisco, CA',94,'linkedin.com/in/margaretchen','Name, location and graduation timeline align with a UC engineering background.')]),
  A(2,'David Okafor','Texas','School of Business',2009,[
    c('David Okafor','Director of Operations at Dell Technologies','Director of Operations','Dell Technologies','Austin, TX',88,'linkedin.com/in/davidokafor','Strong name match; Austin location consistent with state on file.')]),
  A(3,'Priya Raman','New York','College of Arts & Sciences',2018,[
    c('Priya Raman','Associate at McKinsey & Company','Associate','McKinsey & Company','New York, NY',71,'linkedin.com/in/priyaraman','Common name — two plausible NYC profiles found.'),
    c('Priya Raman','Investment Analyst at Goldman Sachs','Investment Analyst','Goldman Sachs','New York, NY',64,'linkedin.com/in/priya-raman-2','Alternate profile with matching name and city.')]),
  A(4,'James Sullivan','Massachusetts','School of Law',2002,[
    c('James Sullivan','Partner at Ropes & Gray','Partner','Ropes & Gray','Boston, MA',91,'linkedin.com/in/jamessullivan','Legal career and Boston location align with law degree on file.')]),
  A(5,'Aisha Mohammed','Illinois','College of Medicine',2016,[
    c('Aisha Mohammed','Resident Physician at Northwestern Memorial','Resident Physician','Northwestern Memorial Hospital','Chicago, IL',83,'linkedin.com/in/aishamohammed','Medical career path and Chicago location are consistent.')]),
  A(6,'Carlos Mendez','Florida','College of Engineering',2011,[
    c('Carlos Mendez','Software Engineer','Software Engineer','','Miami, FL',57,'linkedin.com/in/cmendez-eng','Weak match — employer not listed and limited profile detail. Please verify.')]),
  A(7,'Emily Carter','Washington','School of Business',2020,[
    c('Emily Carter','Marketing Manager at Amazon','Marketing Manager','Amazon','Seattle, WA',89,'linkedin.com/in/emilycarter','Seattle location and recent graduation timeline align well.')]),
  A(8,'Robert Kim','New Jersey','College of Arts & Sciences',2007,[
    c('Robert Kim','VP, Finance at Prudential Financial','Vice President, Finance','Prudential Financial','Newark, NJ',76,'linkedin.com/in/robertkim-fin','Name and NJ location match; tenure consistent with graduation year.')]),
  A(9,'Sofia Rossi','California','College of Engineering',2019,[
    c('Sofia Rossi','Data Scientist at Meta','Data Scientist','Meta','Menlo Park, CA',69,'linkedin.com/in/sofiarossi','Two engineering profiles in the Bay Area — confirm correct match.'),
    c('Sofia Rossi','Machine Learning Engineer at Apple','Machine Learning Engineer','Apple','Cupertino, CA',66,'linkedin.com/in/sofia-rossi-ml','Alternate Bay Area profile with matching name.')]),
  A(10,'Thomas Wright','Georgia','School of Education',2013,[
    c('Thomas Wright','Principal at Atlanta Public Schools','Principal','Atlanta Public Schools','Atlanta, GA',85,'linkedin.com/in/thomaswright-edu','Education career aligns with degree affiliate and state.')]),
  A(11,'Hannah Lee','Oregon','College of Arts & Sciences',2021,[
    c('Hannah Lee','UX Designer at Nike','UX Designer','Nike','Portland, OR',92,'linkedin.com/in/hannahlee','Portland location and recent graduation are a strong signal.')]),
  A(12,'Michael Brennan','Pennsylvania','School of Business',2005,[
    c('Michael Brennan','Independent Consultant','Consultant','Self-employed','Philadelphia, PA',54,'linkedin.com/in/mbrennan-consult','Low confidence — sparse profile, no firm listed. Recommend manual check.')]),
  A(13,'Grace Thompson','Colorado','College of Medicine',2015,[
    c('Grace Thompson','Attending Physician at UCHealth','Attending Physician','UCHealth','Denver, CO',87,'linkedin.com/in/gracethompson-md','Medical career and Denver location align with record.')]),
  A(14,'Daniel Foster','Virginia','School of Law',2010,[
    c('Daniel Foster','General Counsel at Capital One','General Counsel','Capital One','Richmond, VA',90,'linkedin.com/in/danielfoster','Legal role and Richmond location strongly consistent with law degree.')]),
]

const AVATAR_PALETTE = ['#7b2c39','#39435c','#3f7d5b','#b08d4f','#5c4a6b','#3a6a7a']

export function confMeta(v) {
  if (v >= 85) return { label: 'High confidence', short: v + '%', color: '#3f7d5b', bg: '#e6f0ea' }
  if (v >= 65) return { label: 'Needs review',    short: v + '%', color: '#9a6a1f', bg: '#f5ecda' }
  return           { label: 'Low confidence',  short: v + '%', color: '#a8443f', bg: '#f6e6e5' }
}

export function avatarBg(i) { return AVATAR_PALETTE[i % AVATAR_PALETTE.length] }

export function initialsOf(name) {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('')
}