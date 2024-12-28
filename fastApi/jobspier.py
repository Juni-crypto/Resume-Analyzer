import csv
from jobspy import scrape_jobs

search_term = "Full Stack Engineer"  # Define your search term here
location = "India"

jobs = scrape_jobs(
    site_name=["indeed", "linkedin", "glassdoor"],
    search_term=search_term,
    location=location,
    results_wanted=20,
    hours_old=72,  # (only Linkedin/Indeed is hour specific, others round up to days old)
    country_indeed='India',  # only needed for indeed / glassdoor
    linkedin_fetch_description=True,  # get full description and direct job url for linkedin (slower)
    proxies=["208.195.175.46:65095", "208.195.175.45:65095", "localhost"],
)

print(f"Found {len(jobs)} jobs")
print(jobs.head())

# Dynamically create the CSV filename
filename = f"{search_term.replace(' ', '_')}_{location.replace(' ', '_')}.csv"
jobs.to_csv(filename, quoting=csv.QUOTE_NONNUMERIC, escapechar="\\", index=False)
print(f"CSV saved as {filename}")