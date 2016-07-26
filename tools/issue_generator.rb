require 'active_support'
require 'active_support/core_ext/integer/time'
require 'active_support/core_ext/object/json'
require 'faker'

issues = (1..100).map do
  status = %w(opening closed).sample
  submission_at = Faker::Time.between(7.days.ago, Date.today)
  closed_at = status == 'opening' ? '' : Faker::Time.between(submission_at, Date.today)
  {
    submissionAt: submission_at,
    customerName: Faker::Name.name,
    customerEmail: Faker::Internet.email,
    description: Faker::Lorem.sentence(1),
    employeeName: Faker::Name.name,
    closedAt: closed_at,
    status: status
  }
end

f = File.new('issues.json', 'w')
f.write(issues.to_json)
