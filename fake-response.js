'use strict';

const xml =
`<gesmes:Envelope>
  <gesmes:subject>Reference rates</gesmes:subject>
  <gesmes:Sender>
    <gesmes:name>European Central Bank</gesmes:name>
  </gesmes:Sender>
  <Cube>
    <Cube time="2018-05-18">
      <Cube currency="USD" rate="1.1632"/>
      <Cube currency="INR" rate="78.388"/>
      <Cube currency="GBP" rate="0.875"/>
    </Cube>
  </Cube>
</gesmes:Envelope>`;

module.exports = xml;
