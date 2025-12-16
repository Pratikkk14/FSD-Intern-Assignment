// Get avg miles per person, sorted by highest avg
export function getAverageMilesPerPerson(normalizedRows) {
  const personStats = {};

  normalizedRows.forEach(run => {
    if (!personStats[run.person]) {
      personStats[run.person] = { total: 0, count: 0 };
    }
    personStats[run.person].total += run.miles;
    personStats[run.person].count += 1;
  });

  return Object.keys(personStats)
    .map(person => ({
      person,
      average: parseFloat((personStats[person].total / personStats[person].count).toFixed(2)),
    }))
    .sort((a, b) => b.average - a.average);
}

// Get total miles per person, sorted by highest
export function getTotalMilesPerPerson(normalizedRows) {
  const personStats = {};

  normalizedRows.forEach(run => {
    if (!personStats[run.person]) {
      personStats[run.person] = 0;
    }
    personStats[run.person] += run.miles;
  });

  return Object.keys(personStats)
    .map(person => ({
      person,
      total: parseFloat(personStats[person].toFixed(2)),
    }))
    .sort((a, b) => b.total - a.total);
}

// Get date vs miles for one person (for line chart)
export function getPersonTrendData(normalizedRows, personName) {
  return normalizedRows
    .filter(run => run.person === personName)
    .map(run => ({
      date: run.date,
      miles: run.miles,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

// Summary stats: runs, people, miles
export function getOverallMetrics(normalizedRows) {
  const uniquePeople = new Set(normalizedRows.map(r => r.person)).size;
  const totalMiles = normalizedRows.reduce((sum, r) => sum + r.miles, 0);

  return {
    totalRuns: normalizedRows.length,
    totalPeople: uniquePeople,
    totalMiles: parseFloat(totalMiles.toFixed(2)),
  };
}

// Stats for a single person
export function getPersonMetrics(normalizedRows, personName) {
  const personRuns = normalizedRows.filter(r => r.person === personName);
  const totalMiles = personRuns.reduce((sum, r) => sum + r.miles, 0);
  const runCount = personRuns.length;
  const averageMiles = runCount > 0 ? totalMiles / runCount : 0;

  return {
    totalMiles: parseFloat(totalMiles.toFixed(2)),
    runCount,
    averageMiles: parseFloat(averageMiles.toFixed(2)),
  };
}
