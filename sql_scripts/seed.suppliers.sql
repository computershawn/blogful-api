-- first remove any data that may be present
TRUNCATE  supplier, item, supplier_order RESTART IDENTITY CASCADE;

-- insert some suppliers
INSERT INTO supplier
  (supplier_name, phone, city)
  VALUES 
    ('Arnold Grummers Papermaking', '920-840-6056', 'Appleton'),
    ('Blumfeld Paper', '555-6789', 'Moscow');

-- insert some items
INSERT INTO item
  (item_name, unit, unit_cost, supplier)
  VALUES
    ('Paper Additives', 'LBS', '3.85', 1),
    ('Abaca Sheet Pulp', 'LBS', '11.20', 1),    
    ('Wood pulp', 'LBS', '0.20', 2),
    ('White Envelope Paper', 'LBS', '0.52', 1);

-- insert some orders
INSERT INTO supplier_order 
  (item, amount, total_cost, shipping_status)
  VALUES
    (1, 10, 38.5, 'Delivered'),
    (2, 2000, 1240, 'Shipped'),
    (3, 50, 560, 'Shipped'),
    (2, 1000, 620, 'Preparing');  