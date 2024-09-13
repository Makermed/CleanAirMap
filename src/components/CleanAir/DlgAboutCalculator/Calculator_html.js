export const calculator_html = `
<p style="font-size:18px;">What does this mean?</p>
<br/>
<p>Protection from airborne diseases (including Covid), can be achieved through ventilation, filtration (like HEPA filters) or the use of UV light. CO2 only measures ventilation. To take into account all the ways safe indoor air is being provided, we've calculated the contribution of filtration and UV to provide cleaner air and called it "Equivalent CO2."</p>
<br/>
<p style="font-size:18px;">Terms</p>
<br/>
<p>CO2 generated per person can be measured in CFM (cubic feet per minute) or lps (litres per second). Clean air delivery rate (CADR) or the equivalent outdoor air rate from portable air cleaners is denoted in CFM or lps, as is disinfection rate from UV fixtures</p>
<br/>
<p style="font-size:18px;">Calculations</p>
<br/>
<p>First we calculate the total clean air delivery rate, or the equivalent outdoor air rate.  We will then use that co calculated the equivalent CO2 level.</p>
<br/>
<p>F = clean air delivery rate from HEPA filters is based on the specifications of the HEPA filter</p>
<br/>
<p>V = Clean air delivery rate from upper room UVGI is calculated as 555 lps/W or 1171 CFM/W based on an estimate from this publication.</p>
<br/>
<p>Additional clean air delivery/person<br/></p>
<p>= (F+V)/capacity of the space</p>
<br/>
<p>Total clean air delivery rate/person</p>
<p>= Outdoor air rate per person + Additional clean air delivery/person</p>
<br/>
<p>We break the activity level down to Sedentary (1.4 METs), Moderate (4 METs), Heavy (8 METs).   These are estimated at 0.0054 L/s, 0.0154 L/s and 0.0308 L/s respectively. This is based on this publication.</p>
<br/>
<p>Methods to calculate an equivalent CO2 level were developed by Joseph Fox, P.Eng.</p>
<p>More details <a href="https://twitter.com/joeyfox85/status/1534335303607017473?s=20&t=DHed3a4i_4RtUPmuSP4fbQ" target="_blank">here</a>.</p>
<br/>
`;