import React from 'react';
import StudentBook from './StudentBook';

function App() {
  return (
    <div>
      {/* ហៅ Component មកប្រើដោយសាកល្បងជាមួយសិស្ស ID លេខ 1 */}
      <StudentBook studentId={1} />
    </div>
  );
}

export default App;