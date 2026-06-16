import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function StudentBook({ studentId }) {
  const [data, setData] = useState(null);
  // URL នេះសម្រាប់សាកល្បងនៅលើម៉ាស៊ីន local របស់អ្នក (Localhost)
  const API_URL = "http://localhost:3000/api"; 

  useEffect(() => {
    // ទាញយកទិន្នន័យពី Backend
    axios.get(`${API_URL}/student-book/${studentId}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [studentId]);

  const handleSign = (role) => {
    axios.post(`${API_URL}/sign`, { student_id: studentId, semester: 1, role })
      .then(() => {
        alert("ចុះហត្ថលេខាជោគជ័យ!");
        window.location.reload(); // ផ្ទុកទំព័រឡើងវិញដើម្បីឃើញបច្ចុប្បន្នភាព
      })
      .catch(err => alert("មានបញ្ហា៖ " + err.message));
  };

  if (!data) return <p style={{ textAlign: 'center', marginTop: '20px' }}>កំពុងទាញយកទិន្នន័យ...</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#1a73e8' }}>សៀវភៅតាមដានលទ្ធផលសិក្សាសិស្សថ្នាក់ទី១២</h2>
      <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <p style={{ margin: 0 }}><strong>ឈ្មោះសិស្ស:</strong> {data.student?.student_name || 'មិនមានឈ្មោះ'}</p>
        <p style={{ margin: '5px 0 0 0' }}><strong>ថ្នាក់ទី:</strong> 12</p>
      </div>

      {/* តារាងបង្ហាញពិន្ទុ ១៣ មុខវិជ្ជា */}
      <div style={{ overflowX: 'auto' }}>
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', border: '1px solid #ddd' }}>
          <thead>
            <tr style={{ backgroundColor: '#1a73e8', color: 'white' }}>
              <th>អក្សរសាស្ត្រខ្មែរ</th>
              <th>គណិតវិទ្យា</th>
              <th>រូបវិទ្យា</th>
              <th>គីមីវិទ្យា</th>
              <th>ជីវវិទ្យា</th>
              <th>ប្រវត្តិវិទ្យា</th>
              <th>ភូមិវិទ្យា</th>
              <th>ផែនដីវិទ្យា</th>
              <th>សីលធម៌</th>
              <th>អង់គ្លេស</th>
              <th>ព័ត៌មានវិទ្យា</th>
              <th>សិល្បៈ</th>
              <th>អប់រំកាយ</th>
            </tr>
          </thead>
          <tbody>
            {data.scores?.map((score) => (
              <tr key={score.id}>
                <td>{score.khmer}</td>
                <td>{score.math}</td>
                <td>{score.physics}</td>
                <td>{score.chemistry}</td>
                <td>{score.biology}</td>
                <td>{score.history}</td>
                <td>{score.geography}</td>
                <td>{score.earth_science}</td>
                <td>{score.morality}</td>
                <td>{score.english}</td>
                <td>{score.it}</td>
                <td>{score.art}</td>
                <td>{score.pe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ផ្នែកហត្ថលេខា */}
      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ border: '1px dashed #ccc', padding: '20px', borderRadius: '8px', textAlign: 'center', minWidth: '200px' }}>
          <p style={{ fontWeight: 'bold' }}>ហត្ថលេខាគ្រូបន្ទុកថ្នាក់</p>
          {data.signatures[0]?.teacher_signed ? <p style={{ color: 'green', fontWeight: 'bold' }}>✓ បានចុះហត្ថលេខា</p> : 
            <button onClick={() => handleSign('teacher')} style={{ padding: '8px 15px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>ចុះហត្ថលេខា</button>}
        </div>
        
        <div style={{ border: '1px dashed #ccc', padding: '20px', borderRadius: '8px', textAlign: 'center', minWidth: '200px' }}>
          <p style={{ fontWeight: 'bold' }}>ហត្ថលេខាអាណាព្យាបាល</p>
          {data.signatures[0]?.parent_signed ? <p style={{ color: 'green', fontWeight: 'bold' }}>✓ បានចុះហត្ថលេខា</p> : 
            <button onClick={() => handleSign('parent')} style={{ padding: '8px 15px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>ចុះហត្ថលេខា</button>}
        </div>

        <div style={{ border: '1px dashed #ccc', padding: '20px', borderRadius: '8px', textAlign: 'center', minWidth: '200px' }}>
          <p style={{ fontWeight: 'bold' }}>ហត្ថលេខានាយកសាលា</p>
          {data.signatures[0]?.director_signed ? <p style={{ color: 'green', fontWeight: 'bold' }}>✓ បានចុះហត្ថលេខា</p> : 
            <button onClick={() => handleSign('director')} style={{ padding: '8px 15px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>ចុះហត្ថលេខា</button>}
        </div>
      </div>
    </div>
  );
}