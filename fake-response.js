'use strict';

const xml =
`<gesmes:Envelope>
  <gesmes:subject>Reference rates</gesmes:subject>
  <gesmes:Sender>
    <gesmes:name>European Central Bank</gesmes:name>
  </gesmes:Sender>
  <Cube>
    <Cube time="2018-05-18">
      <Cube currency="USD" rate="1.1781"/>
      <Cube currency="JPY" rate="130.69"/>
    </Cube>
  </Cube>
</gesmes:Envelope>`;

module.exports = xml;
