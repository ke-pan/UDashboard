require 'active_support'
require 'active_support/core_ext/integer/time'
require 'active_support/core_ext/object/json'
require 'faker'

issues = (1..100).map do
  status = %w(opening closed).sample
  submition_at = Faker::Date.between(2.days.ago, Date.today)
  closed_at = status == 'opening' ? '' : Faker::Date.between(submition_at, Date.today)
  {
    submitionAt: submition_at,
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
